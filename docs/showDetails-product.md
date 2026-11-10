<script setup lang="ts">
import { ref } from "vue";

const showDetails = ref(false);
</script>
<template>
  <div>
    <input
      class="cursor-pointer m-2"
      type="checkbox"
      v-model="showDetails"
      id="show-details"
    />
    <label class="cursor-pointer font-semibold m-2" for="show-details"
      >Show Details</label
    >
    <div v-if="showDetails">
      <p class="m-2 font-semibold">Product Details Are Shown</p>
    </div>
  </div>
</template>
