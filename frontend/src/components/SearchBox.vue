<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 3rem;
  height: 4rem;
  gap: 1rem;
  background-color: rgb(247, 243, 0);
}

.layout {
  max-width: 60rem;
  width: 100%;
  margin: auto;
  display: flex;
  gap: 1rem;
}

.logo {
  height: 2.5rem;
}

.search-box {
  width: 100%;
  height: 2.5rem;
  padding-left: 1rem;
}

.search-button {
  height: 2.5rem;
  padding: 0 1rem;
}
</style>

<template>
  <div class="container">
    <div class="layout">

      <router-link to="/">
        <img class="logo" src="/logo.png" />
      </router-link>
      <input
        ref="input"
        class="search-box"
        placeholder="Ingrese búsqueda de producto"
        maxlength="70"
        @keyup.enter="onSearch"
        @input="onInputChanged"
      />
      <button class="search-button" :disabled="searchDisabled" @click="onSearch">🔎</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref(null)

let searchDisabled = ref(true)

const emit = defineEmits(['search'])

const setSearchString = (searchTerm) => input.value.value = searchTerm

const onInputChanged = (e) => searchDisabled.value = input.value.value.length === 0

const onSearch = (e) => {
  if (!searchDisabled.value) {
    const searchTerm = input.value.value
    emit('search', searchTerm)
  }
}

defineExpose({
  setSearchString
})
</script>
