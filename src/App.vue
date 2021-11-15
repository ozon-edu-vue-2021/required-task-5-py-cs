<template>
  <div id="app">
    <nav class="nav">
      <router-link class="link" to="/">Products</router-link>
      <router-link class="link" to="/basket">Basket</router-link>
      <router-link class="link" to="/favorites">Your Favorites</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  --clr-neutral-900: hsl(207, 19%, 9%);
  --clr-neutral-200: hsl(0, 0%, 85%);
  --clr-neutral-100: hsl(0, 0%, 100%);
  --clr-accent-400: hsl(142, 90%, 61%);
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
<style scoped>
.nav {
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 10px 40px;
  background-color: var(--clr-neutral-200);
}
.link {
  border: 2px solid var(--clr-accent-400);
  border-radius: 12px;
  padding: 5px 15px;
  text-decoration: none;
  color: black;
  background-color: var(--clr-neutral-100);
  transition: transform 0.4s ease;
}
.link:hover {
  transform: scale(1.08);
}
</style>
