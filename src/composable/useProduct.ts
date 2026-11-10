import { ref, computed } from "vue";
import type { ProductSchemaType } from "../schemas/product.schema";
import { useLocalStorage } from "./useLocalStorage";

export const useProducts = () => {
  const products = useLocalStorage("products", [
    { id: 1, name: "Laptop", price: 1000000 },
    { id: 2, name: "Mouse", price: 2000000 },
    { id: 3, name: "Keyboard", price: 3000000 },
  ]);

  const search = ref("");

  function deleteProduct(id: number) {
    products.value = products.value.filter((product) => product.id !== id);
  }

  function addProduct(product: ProductSchemaType) {
    products.value.push({
      id: Math.max(0, ...products.value.map((item) => item.id)) + 1,
      ...product,
    });
  }
  const filteredProducts = computed(() => {
    const query = search.value.trim().toLowerCase();

    return products.value.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  });
  return { products, deleteProduct, addProduct, search, filteredProducts };
};
