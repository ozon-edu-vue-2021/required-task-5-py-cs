import Vue from "vue";
import Vuex from "vuex";
import transformData from "../util/transformData";

Vue.use(Vuex);

const BASE_URL = "https://random-data-api.com/api/food/random_food?size=30";

export default new Vuex.Store({
  state: () => ({
    products: {},
    basket: {},
    favorites: new Set(),
    isLoading: false,
    error: null,
  }),
  getters: {
    getBasketTotal(state) {
      const { basket, products } = state;
      let total = 0;
      Object.entries(basket).forEach(([id, qty]) => {
        const product = products[id];
        total += qty * product.price;
      });
      return total;
    },
    getFavorites(state) {
      const { favorites, products } = state;
      return [...favorites].map((id) => products[id]);
    },
    getFavoriteById(state) {
      return (id) => state.favorites.has(id);
    },
    getBasketItems(state) {
      const { products, basket } = state;
      return Object.entries(basket).reduce((items, [id, qty]) => {
        if (qty === 0) return items;
        const product = products[id];
        const { name, image, price } = product;
        const newProduct = { id, qty, name, image, price };
        return items.concat(newProduct);
      }, []);
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setFavorites(state, favorites) {
      state.favorites = favorites;
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
      if (qty < 1) return;
      commit("setBasket", { ...basket, [id]: qty - 1 });
    },
    toggleFavorite({ state, commit }, id) {
      const toggled = new Set(state.favorites);
      if (toggled.has(id)) {
        toggled.delete(id);
      } else {
        toggled.add(id);
      }
      commit("setFavorites", toggled);
    },
  },
});
