import Vue from "vue";
import Vuex from "vuex";
import transformData from "../util/transformData";

Vue.use(Vuex);

const BASE_URL = "https://random-data-api.com/api/food/random_food?size=30";

export default new Vuex.Store({
  state: () => ({
    products: [],
    basket: {},
    isLoading: false,
    error: null,
  }),
  getters: {
    getBasketTotal(state) {
      const { basket, products } = state;
      let total = 0;
      Object.entries(basket).forEach(([id, qty]) => {
        const product = products.find((p) => p.id === Number(id));
        total += qty * product.price;
      });
      return total;
    },
    getFavorites(state) {
      return state.products.filter((product) => product.isFavorite);
    },
    getBasketItems(state) {
      const { products, basket } = state;
      return Object.entries(basket)
        .filter(([, qty]) => qty)
        .map(([id, qty]) => {
          const product = products.find((p) => p.id === Number(id));
          const { name, image, price } = product;
          return {
            id,
            qty,
            name,
            image,
            price,
          };
        });
    },
    getRecipe(_, getters) {
      return (
        getters.getBasketItems
          .map((item) => `${item.name}: $${item.price} x ${item.qty}`)
          .join("\n") + `\n-----\nTotal: $${getters.getBasketTotal.toFixed(2)}`
      );
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    setBasket(state, basket) {
      state.basket = basket;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        commit("setIsLoading", true);
        const rawData = await fetch(BASE_URL).then((resp) => resp.json());
        commit("setProducts", transformData(rawData));
      } catch (err) {
        commit("setError", err.message);
      } finally {
        commit("setIsLoading", false);
      }
    },
    increaseBasket({ state, commit }, id) {
      const { basket } = state;
      const qty = basket[id] || 0;
      commit("setBasket", { ...basket, [id]: qty + 1 });
    },
    decreaseBasket({ state, commit }, id) {
      const { basket } = state;
      const qty = basket[id] || 0;
      commit("setBasket", { ...basket, [id]: qty - 1 });
    },
    toggleFavorite({ state, commit }, id) {
      const { products } = state;
      const toggled = products.map((product) =>
        product.id === Number(id)
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      );
      commit("setProducts", toggled);
    },
  },
});
