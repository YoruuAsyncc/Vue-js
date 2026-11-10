<script setup lang="ts">
import { ref } from "vue";

const search = ref("");

function resetSearch() {
  search.value = "";
}
</script>

<template>
  <div class="p-5">
    <label for="product-search" class="font-bold"> Search: </label>

    <input
      class="border-2 border-gray-500 m-2 p-2 rounded-lg"
      id="product-search"
      v-model="search"
      type="text"
      placeholder="Search Product"
    />
    <button
      class="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white"
      @click="resetSearch()"
    >
      Clear
    </button>
    <p>Result: {{ search }}</p>
  </div>
</template>
