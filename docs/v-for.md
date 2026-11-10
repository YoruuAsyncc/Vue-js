<script setup lang="ts">
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 10000000,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Mouse",
    price: 250000,
    isAvailable: false,
  },
];
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">Daftar Produk:</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <p>{{ product.name }}</p>
        <p>{{ product.price }}</p>
        <p
          :class="{
            'text-green-500': product.isAvailable,
            'text-red-500': !product.isAvailable,
          }"
        >
          {{ product.isAvailable ? "tersedia" : "tidak tersedia" }}
        </p>
      </li>
    </ul>
  </div>
</template>
