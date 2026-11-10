import { ref, computed } from "vue";
import type { ProductSchemaType } from "../schemas/product.schema";

interface Product {
id: number;
name: string;
price: number;
}

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
const res = await fetch("http://localhost:3000/products");
if (!res.ok) throw new Error(`Gagal mengambil data: ${res.status}`);
const data = await res.json();
products.value = data;
} catch (err) {
if (err instanceof Error) {
error.value = err.message;
} else {
error.value = "Terjadi kesalahan";
}
} finally {
loading.value = false;
}
}

async function addProduct(product: ProductSchemaType) {
loading.value = true;
error.value = "";

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error(`Gagal menambah Product: ${res.status}`);
      const data = await res.json();
      products.value.push(data);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Terjadi kesalahan";
      }
    } finally {
      loading.value = false;
    }

}

async function deleteProduct(id: number) {
loading.value = true;
error.value = "";

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Gagal menghapus Product: ${res.status}`);
      products.value = products.value.filter((product) => product.id !== id);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Terjadi kesalahan";
      }
    } finally {
      loading.value = false;
    }

}

async function updateProduct(id: number, product: ProductSchemaType) {
loading.value = true;
error.value = "";

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error(`Gagal mengupdate Product: ${res.status}`);
      const data = await res.json();
      products.value = products.value.map((product) =>
        product.id === id ? data : product,
      );
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Terjadi kesalahan";
      }
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
