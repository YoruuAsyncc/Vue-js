<script setup lang="ts">
interface Props {
  show: boolean;
  message: string;
  type: "success" | "error";
}

defineProps<Props>();

const emit = defineEmits(["close"]);
close: [];
</script>

<template>
  <div
    v-if="show"
    class="fixed top-5 right-5 z-50 rounded-lg p-4 shadow-lg"
    :class="
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    "
  >
    <span>{{ message }}</span>

    <button
      type="button"
      class="ml-3 font-bold hover:opacity-70"
      @click="$emit('close')"
    >
      X
    </button>
  </div>
</template>
