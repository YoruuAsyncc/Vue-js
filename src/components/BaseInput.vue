<script setup lang="ts">
const model = defineModel<string>();
</script>

<template>
  <div>
    <label for="searching-products" class="mx-2">Searching Product:</label>
    <input
      class="rounded border-2 p-2 m-3"
      placeholder="Search"
      id="searching-products"
      v-model="model"
      type="text"
    />
  </div>
</template>
