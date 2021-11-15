<template>
  <div class="item">
    <img class="image" :src="item.image" :alt="item.name" />
    <p class="name">{{ item.name }}</p>
    <p class="price">{{ item.price }}</p>
    <Qty
      :qty="item.qty"
      @increase="() => increaseBasket(item.id)"
      @decrease="() => decreaseBasket(item.id)"
    />
  </div>
</template>

<script>
import Qty from "./Qty.vue";
import { mapActions } from "vuex";

export default {
  name: "BasketItem",
  components: {
    Qty,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      increaseBasket: "increaseBasket",
      decreaseBasket: "decreaseBasket",
    }),
  },
};
</script>

<style>
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border: 2px solid var(--clr-accent-400);
  padding: 10px 40px;
  border-radius: 20px;
  background-color: var(--clr-neutral-200);
}
.image {
  flex: 0 0 100px;
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
}
.name,
.price {
  justify-self: left;
  font-size: 20px;
  font-weight: 600;
}
.name {
  flex-grow: 1;
}
.price::before {
  content: "$";
}
</style>
