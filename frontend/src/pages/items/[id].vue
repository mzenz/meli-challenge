<style scoped>
.item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 1rem 3rem;
  gap: .8rem;
  background-color: white;
}

.outer-layout {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: flex-start;
}

.column-1 {
  display: flex;
  flex-direction: column;
}

.column-2 {
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  gap: 1rem;
}

.picture {
  max-height: 20rem;
  margin: auto;
}

.price-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: .5rem;
}

.price {
  font-size: 3rem;
}

.decimals {
  font-size: 1.5rem;
  padding-top: .4rem;
}

.button {
  color: white;
  font-size: 1rem;
  background-color: #0080ff;
  border: none;
  border-radius: .3rem;
  height: 3rem;
}

.detail {
  font-size: .8rem;
  color: #6b6b6b;
  text-transform: capitalize;
}
@media (max-width: 800px) {
  .outer-layout {
    flex-direction: column;
  }
}
</style>

<template>
  <SearchBox @search="onSearch" />
  <!-- <Breadcrumbs :items="categories" /> -->
  <div class="content">
    <div class="item">
      <div class="outer-layout">
        <div class="column-1">
          <img class="picture" :src="picture" />
          <h1>Descripción del producto</h1>
          <p>{{ description }}</p>
        </div>
        <div class="column-2">
          <span class="detail">{{ condition === 'new' ? 'nuevo' : 'usado' }} - {{ stock }} en stock</span>
          <h3>{{ title }}</h3>
          <div class="price-wrapper">
            <p class="price">$ {{ price.toLocaleString() }}</p>
            <p class="decimals">{{ decimals < 10 ? '0' : ''}}{{ decimals }}</p>
          </div>
          <button class="button">Comprar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBox from '../../components/SearchBox.vue'
// import Breadcrumbs from '../../components/Breadcrumbs.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchItemInfo } from '../../lib/api'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const picture = ref('')
const title = ref('Producto')
const condition = ref('')
const stock = ref(0)
const description = ref('')
const price = ref(0)
const decimals = ref(0)

useHead({
  title: () => `${title.value} - Mercado Libre`,
})

onMounted(() => {
  const itemId = route.params.id
  console.debug(itemId)
  fetchItemInfo(itemId)
})

const fetchItemInfo = async (itemId) => {
  const itemInfo = await searchItemInfo(itemId)
  picture.value = itemInfo.item.picture
  title.value = itemInfo.item.title
  condition.value = itemInfo.item.condition
  stock.value = itemInfo.item.initial_quantity
  description.value = itemInfo.item.description
  price.value = itemInfo.item.price.amount
  decimals.value = itemInfo.item.price.decimals

  // console.debug(title.value)
}

const onSearch = (searchString) => {
  router.push({ path: '/items', query: { q: searchString }})
}
</script>
