<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 1rem 1rem;
  gap: .8rem;
}

.item {
  color: gray;
  font-size: .7em;
}
</style>

<template>
  <div v-if="props.items.length" class="container">
    <span class="item" v-for="item in props.items">{{item}}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: Array
})
</script>
