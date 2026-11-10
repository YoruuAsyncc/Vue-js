<script setup lang="ts">
import { ref, provide, computed } from "vue";
import ProductCard from "./components/ProductCard.vue";
import BaseInput from "./components/BaseInput.vue";
import ProductForm from "./components/ProductForm.vue";
import BaseCard from "./components/BaseCard.vue";
import UseCard from "./components/UseCard.vue";
import WelcomeMessage from "./components/WelcomeMessage.vue";
import WindowWidth from "./components/WindowWidth.vue";
import FocusInput from "./components/FocusInput.vue";
import UserProfile from "./components/UserProfile.vue";
import { userNameKey } from "./keys/injectionKeys";
import type { Product } from "./types/product";
import type { ProductSchemaType } from "./schemas/product.schema";
import { useProductsQuery } from "./composable/useProductQuery.ts";
import BaseToast from "./components/baseToast.vue";
import { useToast } from "./composable/useToast";

const count = ref(0);
const userName = ref("Rinaru");
const editingProduct = ref<Product | null>(null);
const search = ref("");

provide(userNameKey, userName);

const {
  productsQuery,
  createProductMutation,
  deleteProductMutation,
  updateProductMutation,
} = useProductsQuery();

const {
  isPending: isCreating,
  isSuccess: isCreateSuccess,
  isError: isCreateError,
  error: createError,
} = createProductMutation;

const {
  isPending: isUpdating,
  isSuccess: isUpdateSuccess,
  isError: isUpdateError,
  error: updateError,
} = updateProductMutation;

const { reset: resetCreateMutation } = createProductMutation;

const { reset: resetUpdateMutation } = updateProductMutation;

const {
  data: productsApi,
  isLoading,
  isFetching,
  isError,
  error,
} = productsQuery;

const { toast, showToast, hideToast } = useToast();

async function handleSubmitProduct(product: ProductSchemaType) {
  try {
    if (editingProduct.value) {
      resetUpdateMutation();
      await updateProductMutation.mutateAsync({
        id: editingProduct.value.id,
        data: product,
      });
      editingProduct.value = null;
      showToast("Product Berhasil Di Update", "success");
    } else {
      resetCreateMutation();
      await createProductMutation.mutateAsync(product);
      showToast("Product Berhasil Di Tambahkan", "success");
    }
  } catch (error) {
    showToast("Gagal menyimpan produk!", "error");
  }
}

const filteredProducts = computed(() => {
  const products = productsApi.value ?? [];

  return products.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});
const isSubmitting = computed(() => isCreating.value || isUpdating.value);

function editProduct(id: number) {
  const product = productsApi.value?.find((product) => product.id === id);
  if (product) {
    editingProduct.value = product;
  }
}

async function handleDeleteProduct(id: number) {
  try {
    await deleteProductMutation.mutateAsync(id);
    showToast("Product berhasil dihapus!", "success");
  } catch (error) {
    showToast("Gagal menghapus produk!", "error");
  }
}
</script>

<template>
  <ProductForm
    :product="editingProduct ?? undefined"
    :loading="isSubmitting"
    @submit="handleSubmitProduct"
  />

  <!-- CREATE FEEDBACK -->
  <p v-if="isCreating">Sedang Menyimpan Product ...</p>
  <p v-if="isFetching && !isLoading">Memperbarui Data Product...</p>
  <p v-if="isCreateSuccess" class="text-green-500">
    Product Berhasil Di Tambahkan!
  </p>
  <p v-if="isCreateError" class="text-red-500">{{ createError?.message }}</p>
  <BaseInput v-model="search" />
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError" class="text-red-500">{{ error?.message }}</p>

  <!-- UPDATE FEEDBACK -->
  <p v-if="isUpdating">Sedang memperbarui...</p>
  <p v-if="isUpdateSuccess" class="text-green-500">
    Produk berhasil diperbarui!
  </p>
  <p v-if="isUpdateError" class="text-red-500">
    {{ updateError?.message }}
  </p>
  <BaseToast
    :show="toast.show"
    :message="toast.message"
    :type="toast.type"
    @close="hideToast"
  />
  <ProductCard
    v-for="product in filteredProducts"
    :key="product.id"
    :product="product"
    @delete="handleDeleteProduct"
    @edit="editProduct"
  />
  <BaseCard>
    <template #header>
      <h2>Product Management</h2>
    </template>

    <p>Daftar Product Tersedia</p>

    <template #footer>
      <p>Total Product: {{ productsApi?.length }}</p>
    </template>
  </BaseCard>
  <UseCard>
    <template #default="{ user }">
      <p>Name :{{ user.name }}</p>
      <p>Role :{{ user.role }}</p>
    </template>
  </UseCard>
  <WelcomeMessage />
  <WindowWidth />
  <FocusInput />
  <UserProfile />
  <button class="bg-blue-500 p-2 rounded m-2 text-white" @click="count++">
    Count: {{ count }}
  </button>
  <button
    class="bg-blue-500 p-2 rounded m-2 text-white"
    @click="userName = 'Yoruuu'"
  >
    Change Name
  </button>
</template>
