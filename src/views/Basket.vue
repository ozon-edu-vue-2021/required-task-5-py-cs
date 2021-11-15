<template>
  <div class="wrapper">
    <Heading title="Basket" />
    <div class="rows">
      <basket-item v-for="item of basketItems" :key="item.id" :item="item" />
    </div>
    <div class="controls" v-if="!isEmpty">
      <p class="total">Order total: ${{ basketTotal.toFixed(2) }}</p>
      <button class="submit" @click="handleOrderSubmit" :disabled="isEmpty">
        Place Order
      </button>
    </div>
    <div v-else>
      <span>Your basket is empty. </span>
      <router-link to="/">Back to products</router-link>
    </div>
  </div>
</template>

<script>
import BasketItem from "../components/BasketItem";
import Heading from "../components/Heading";
import { mapGetters } from "vuex";

export default {
  name: "Basket",
  components: {
    BasketItem,
    Heading,
  },
  computed: {
    ...mapGetters({
      basketItems: "getBasketItems",
      basketTotal: "getBasketTotal",
    }),
    isEmpty() {
      return this.basketItems.length === 0;
    },
  },
  methods: {
    handleOrderSubmit() {
      const recipe =
        this.basketItems
          .map((item) => `${item.name}: $${item.price} x ${item.qty}`)
          .join("\n") + `\n-----\nTotal: $${this.basketTotal.toFixed(2)}`;
      alert(recipe);
    },
  },
};
</script>

<style scoped>
.wrapper {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
.rows {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.controls {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}
.total {
  font-size: 24px;
}
.submit {
  cursor: pointer;
  display: inline-block;
  text-transform: capitalize;
  font-weight: 700;
  color: var(--clr-neutral-900);
  background-color: var(--clr-accent-400);
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  transition: all 0.2s ease;
}
.submit:active {
  transform: scale(0.95);
}
.submit:hover {
  background-color: var(--clr-neutral-200);
}
</style>
