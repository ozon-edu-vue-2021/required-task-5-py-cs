<template>
  <h1 class="title">{{ title }}</h1>
</template>

<script>
export default {
  name: "Heading",
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },
};
</script>

<style>
.title {
  font-size: 28px;
  text-align: center;
  margin: 20px 0 40px;
}
</style>
