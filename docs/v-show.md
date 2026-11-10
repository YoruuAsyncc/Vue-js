<script setup lang="ts">
import { ref } from "vue";

const isOnline = ref(false);
function toggleStatus() {
  isOnline.value = !isOnline.value;
}
</script>

<template>
  <div>
    <p v-show="isOnline">Status: Online</p> 
    <p v-show="!isOnline">Status Offline</p> 
    <button class="bg-blue-500 rounded-lg px-2 py-1 text-white cursor-pointer" @click="toggleStatus">Toggle Status</button>
  </div>
</template>
