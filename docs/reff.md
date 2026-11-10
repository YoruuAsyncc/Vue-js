<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
  console.log(increment);
}
function decrement() {
  count.value--;
  console.log(decrement);
}
</script>

<template>
  <div class="flex justify-center items-center gap-4 mt-12">
    <button
      @click="decrement"
      class="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md cursor-pointer h-12 w-12 grid place-items-center text-2xl"
    >
      -
    </button>
    <p class="text-4xl font-bold">Count: {{ count }}</p>
    <button
      @click="increment"
      class="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md cursor-pointer h-12 w-12 grid place-items-center text-2xl"
    >
      +
    </button>
  </div>
</template>
