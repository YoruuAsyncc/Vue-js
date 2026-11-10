<script setup lang="ts">
import { ref, watch } from "vue";

const username = ref("");

watch(username, (newValue, oldValue) => {
  console.log(`username berubah dari "${oldValue}" menjadi "${newValue}"`);
});
</script>

<template>
  <div>
    <p>Username:</p>
    <input
      class="border border-gray-400 rounded-lg"
      type="text"
      v-model="username"
    />
  </div>
</template>
