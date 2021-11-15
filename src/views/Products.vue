<template>
  <div>
    <Heading :title="isFavorites ? 'Your Favorites Page' : 'Products Page'" />
    <div class="cards">
      <Card
        v-for="product of products"
        :key="product.id"
        :product="{ ...product, qty: basket[product.id] || 0 }"
      />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import Heading from "../components/Heading";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

export default {
  name: "Products",
  components: {
    Card,
    Heading,
  },
  methods: {
    ...mapMutations({
      setProducts: "setProducts",
    }),
    ...mapActions({
      fetchProducts: "fetchProducts",
    }),
  },
  computed: {
    isFavorites() {
      return this.$route.path === "/favorites";
    },
    ...mapState({
      allProducts: (state) => state.products,
      basket: (state) => state.basket,
    }),
    ...mapGetters({
      basketTotal: "getBasketTotal",
      favorites: "getFavorites",
    }),
    products() {
      return this.isFavorites ? this.favorites : this.allProducts;
    },
  },
  mounted() {
    if (!Object.keys(this.products).length)
      this.$store.dispatch("fetchProducts");
  },
};
</script>

<style>
.cards {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: max(20px, 3vw);
}
</style>
