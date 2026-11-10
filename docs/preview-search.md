<script setup lang="ts">
import { ref } from "vue";

const search = ref("");

function clearSearch() {
  search.value = "";
}
</script>

<template>
  <div class="p-5">
    <label for="product-search"> Search: </label>
    <input
      class="m-3 border-2 border-gray-300 rounded-lg px-5 py-2"
      v-model="search"
      id="product-search"
      type="text"
      placeholder="Cari Product..."
    />
    <button
      class="m-3 border-2 border-gray-300 hover:bg-gray-400 hover:text-white rounded-lg px-5 py-2"
      @click="clearSearch"
    >
      Clear
    </button>
    <p v-if="search.trim().length > 0">
      Mencari: <span class="font-bold">{{ search }}</span>
    </p>
    <p v-else class="text-gray-400">Mulai search product!</p>
  </div>
</template>
