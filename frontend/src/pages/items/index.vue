<template>
  <SearchBox ref="search" @search="onSearch" />
  <div class="content">
    <Breadcrumbs :items="categories" />
    <SearchResult
      v-for="item in items"
      :picture="item.picture"
      :title="item.title"
      :price="item.price.amount.toLocaleString()"
      :item-route="`/items/${item.id}`"
    />
  </div>
</template>

<script setup>
import SearchBox from '../../components/SearchBox.vue'
import Breadcrumbs from '../../components/Breadcrumbs.vue'
import SearchResult from '../../components/SearchResult.vue'
import { onMounted, ref } from 'vue'
import { searchItems } from '../../lib/api'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from 'unhead'

useHead({
  title: 'Mercado Libre - Resultados de búsqueda',
  meta: [
    { name: 'description', content: 'Acá aparecen los resultados de tu búsqueda' },
  ],
})

const router = useRouter()
const route = useRoute()
const search = ref()
const categories = ref([])
const items = ref([])

onMounted(() => {
  if (route.query.q) {
    const searchString = route.query.q
    onSearch(searchString)
  }
})

const onSearch = async (searchString) => {
  search.value.setSearchString(searchString)
  const results = await searchItems(searchString)

  router.push({ path: '/items', query: { q: searchString }})

  if (results.categories) {
    categories.value = results.categories
  }

  if (results.items) {
    items.value = results.items
  }
}
</script>
