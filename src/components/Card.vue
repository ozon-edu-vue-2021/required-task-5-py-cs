<template>
  <div class="card" :style="style">
    <span class="favorite" @click="() => toggleFavorite(product.id)">{{
      star
    }}</span>
    <div class="content">
      <h3 class="heading">{{ product.name }}</h3>
      <p class="description">{{ trimmedDescription }}</p>
      <div class="controls">
        <span class="price">{{ product.price }}</span>
        <Qty
          v-if="isInCart"
          :qty="product.qty"
          @increase="() => increaseBasket(product.id)"
          @decrease="() => decreaseBasket(product.id)"
        />
        <button v-else class="button" @click="() => increaseBasket(product.id)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Qty from "./Qty.vue";
import { mapActions } from "vuex";

export default {
  name: "Card",
  components: {
    Qty,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions({
      increaseBasket: "increaseBasket",
      decreaseBasket: "decreaseBasket",
      toggleFavorite: "toggleFavorite",
    }),
  },
  computed: {
    star() {
      return this.product.isFavorite ? "★" : "☆";
    },
    isInCart() {
      return Boolean(this.product.qty);
    },
    style() {
      return `background: url(${this.product.image})`;
    },
    trimmedDescription() {
      const desc = this.product.description;
      const limit = 90;
      if (desc.length <= limit) return desc;
      return desc.slice(0, limit) + "...";
    },
  },
};
</script>

<style scoped>
.card {
  background-color: var(--clr-neutral-100);
  color: var(--clr-neutral-100);
  font-family: Tahoma, sans-serif;
  background-size: cover;
  padding: 160px 0 0;
  width: 240px;
  height: 360px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  transition: transform 0.4s ease;
}

.favorite {
  position: absolute;
  top: 0;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: gold;
  cursor: pointer;
}

.favorite:hover {
  text-shadow: 0 0 8px gold;
}

.card:hover,
.card:focus-within {
  transform: scale(1.05);
}

.content {
  --padding: 16px;
  padding: var(--padding);
  padding-bottom: 24px;
  background: linear-gradient(
    hsl(0 0% 0% / 0),
    hsl(20 0% 0% / 0.3) 20%,
    hsl(0 0% 0% / 1)
  );
}

.heading {
  position: relative;
  width: max-content;
}

.heading::after {
  content: "";
  position: absolute;
  height: 4px;
  background-color: var(--clr-accent-400);
  left: calc(var(--padding) * -1);
  bottom: -4px;
  width: calc(100% + var(--padding));

  transform-origin: left;
  transition: transform 0.4s ease;
}

.description {
  padding: 15px 0;
  display: inline-block;
  overflow: hidden;
  height: 90px;
  color: var(--clr-neutral-200);
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.price {
  font-size: 20px;
  font-weight: bold;
}

.price::before {
  content: "$";
}

.button {
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
}

.button:active {
  transform: scale(0.95);
}

@media (hover) {
  .content {
    transform: translateY(60%);
    transition: transform 0.4s ease;
  }
  .card:hover .content,
  .card:focus-within .content {
    transform: translateY(0);
    transition-delay: 0.4s;
  }

  .card:focus-within .content {
    transition-duration: 0;
  }

  .content > *:not(.heading) {
    opacity: 0;
    transition: opacity 0.4s linear;
  }

  .card:hover .content > *:not(.heading),
  .card:focus-within .content > *:not(.heading) {
    opacity: 1;
    transition-delay: 0.65s;
  }

  .card:hover .heading::after,
  .card:focus-within .heading::after {
    transform: scaleX(1);
  }

  .heading::after {
    transform: scaleX(0);
  }

  .button:hover,
  .button.focus {
    background-color: var(--clr-neutral-100);
  }
}
</style>
