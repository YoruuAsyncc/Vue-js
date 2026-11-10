<script setup lang="ts">
import { computed, ref } from "vue";

const price = ref(50000);
const quantity = ref(2);

const total = computed(() => {
  return price.value * quantity.value;
});
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <h1>Total: {{ total }}</h1>
    <button
      class="bg-blue-500 rounded-lg px-2 py-1 text-white cursor-pointer"
      @click="quantity++"
    >
      Tambah Quantity
    </button>
    <button
      class="bg-red-500 rounded-lg px-2 py-1 text-white cursor-pointer"
      @click="quantity--"
    >
      Kurangi Quantity
    </button>
  </div>
</template>
