<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 1rem;
  margin: .05rem 0;
  gap: 1rem;
  background-color: white;
  text-decoration: none;
  color: black;
}

.detail {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: .5rem;
  text-decoration: none;
}

.thumbnail {
  height: 7rem;
}
</style>

<template>
  <router-link class="container" :to="props.itemRoute">
    <img class="thumbnail" :src="props.picture" />
    <div class="detail">
      <span class="detail">$ {{ props.price }}</span>
      <span>{{ props.title }}</span>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  title: String,
  picture: String,
  price: String,
  itemRoute: String
})
</script>
