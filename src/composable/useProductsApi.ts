import { ref, computed } from "vue";
import type { ProductSchemaType } from "../schemas/product.schema";
import { productService } from "../services/productService";
import type { Product } from "../types/product";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useProductsApi() {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref("");
  const search = ref("");

  const filteredProducts = computed(() => {
    const query = search.value.trim().toLowerCase();

    return products.value.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  });

  async function fetchProducts() {
    try {
      loading.value = true;
      error.value = "";

      products.value = await productService.getAll();
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  }

  async function addProduct(product: ProductSchemaType) {
    loading.value = true;
    error.value = "";

    try {
      const data = await productService.create(product);
      products.value.push(data);
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  }

  async function deleteProduct(id: number) {
    loading.value = true;
    error.value = "";

    try {
      await productService.delete(id);
      products.value = products.value.filter((product) => product.id !== id);
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  }

  async function updateProduct(id: number, product: ProductSchemaType) {
    loading.value = true;
    error.value = "";

    try {
      const data = await productService.update(id, product);
      products.value = products.value.map((product) =>
        product.id === id ? data : product,
      );
    } catch (err) {
      error.value = getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    fetchProducts,
    loading,
    error,
    search,
    filteredProducts,
    addProduct,
    deleteProduct,
    updateProduct,
  };
}
