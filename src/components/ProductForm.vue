<script setup lang="ts">
import { ref, watch } from "vue";
import {
  productSchema,
  type ProductSchemaType,
} from "../schemas/product.schema";

interface props {
  product?: ProductSchemaType;
  loading?: boolean;
}

const props = defineProps<props>();

const name = ref(props.product?.name ?? "");
const price = ref(props.product?.price ?? 0);

const errors = ref<{
  name?: string[];
  price?: string[];
}>({});

watch(
  () => props.product,
  (product) => {
    if (product) {
      name.value = product.name;
      price.value = product.price;
    } else {
      name.value = "";
      price.value = 0;
    }
  },
  { immediate: true },
);

const emit = defineEmits<{
  submit: [product: ProductSchemaType];
}>();

const handleSubmit = () => {
  // Clear previous errors
  errors.value.name = [];
  errors.value.price = [];

  const result = productSchema.safeParse({
    name: name.value,
    price: price.value,
    
  });

  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors;
    return;
  }

  emit("submit", result.data);

  name.value = "";
  price.value = 0;
};
</script>

<template>
  <h2 class="m-2 text-lg font-bold">
    {{ props.product ? "Edit Product" : "Tambah Product" }}
  </h2>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-2 p-2 m-2">
    <div class="flex gap-1">
      <input
        v-model="name"
        type="text"
        placeholder="Nama Produk"
        class="border border-gray-300 rounded-lg p-2"
      />
    </div>
    <span v-if="errors.name?.[0]" class="text-red-500 text-sm">
      {{ errors.name[0] }}
    </span>

    <div class="flex gap-1">
      <input
        v-model.number="price"
        type="number"
        placeholder="Harga Produk"
        class="border border-gray-300 rounded-lg p-2"
      />
    </div>
    <span v-if="errors.price?.[0]" class="text-red-500 text-sm">
      {{ errors.price[0] }}
    </span>

    <button
      type="submit"
      :disabled="loading"
      class="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60 transition-colors text-white px-2 py-1 rounded-lg"
    >
      {{ loading ? "Menyimpan..." : "Simpan Produk" }}
    </button>
  </form>
</template>
