<script setup lang="ts">
import { ref, onMounted } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputRef.value?.focus(); 
});

function handleFocus() {
  inputRef.value?.focus();
}
</script>

<template>
  <div>
    <input ref="inputRef" type="text" placeholder="Search Product..." />
    <button
      class="m-2 rounded-md bg-blue-500 px-2 text-white hover:bg-blue-600"
      @click="handleFocus"
    >
      Focus
    </button>
  </div>
</template>
