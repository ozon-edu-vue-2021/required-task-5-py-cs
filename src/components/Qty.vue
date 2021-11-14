<template>
  <div class="qty-wrapper">
    <span class="caption">In cart:</span>
    <div class="btn-group">
      <button class="button" @click="$emit('decrease')">-</button>
      <p class="value">{{ qty }}</p>
      <button class="button" @click="$emit('increase')">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    qty: {
      default: 0,
    },
  },
};
</script>

<style scoped>
.qty-wrapper {
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-group {
  height: 25px;
  width: 100%;
  border: 1px solid var(--clr-accent-400);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.caption {
  font-size: 14px;
  padding-bottom: 4px;
}

.value {
  flex-basis: 100%;
  text-align: center;
}
.button {
  flex: 0 0 30%;
  height: 100%;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  font-size: 20px;
}

.button:hover {
  background-color: var(--clr-accent-400);
  color: white;
}
</style>
