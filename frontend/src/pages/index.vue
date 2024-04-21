<template>
  <SearchBox @search="onSearch" />
</template>

<script setup>
import SearchBox from '../components/SearchBox.vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Mercado Libre - Búsqueda de producto',
  meta: [
    { name: 'description', content: 'Buscá tus productos' },
  ],
})

const router = useRouter()

const onSearch = (searchString) => {
  router.push({ path: '/items', query: { q: searchString }})
}
</script>
