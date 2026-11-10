<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const width = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

function handleResize() {
  width.value = window.innerWidth;
}
</script>

<template>
  <div>Window width: {{ width }}</div>
</template>
