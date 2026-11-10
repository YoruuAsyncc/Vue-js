<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
}

defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  delete: [id: number];
  edit: [id: number];
}>();
</script>
<template>
  <div class="m-2 p-2">
    <p class="text-lg font-bold">{{ product.name }}</p>
    <p>Price: Rp{{ product.price }}</p>
    <button
      class="bg-red-500 hover:bg-red-700 transition-colors text-white px-2 py-1 rounded m-1"
      @click="emit('delete', product.id)"
    >
      Delete
    </button>
    <button
      class="bg-green-500 hover:bg-green-700 transition-colors text-white px-2 py-1 rounded m-1"
      @click="emit('edit', product.id)"
    >
      Edit
    </button>
  </div>
</template>
