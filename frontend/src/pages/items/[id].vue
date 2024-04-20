<template>
  <h1>Item Details</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

console.debug(route)
</script>
