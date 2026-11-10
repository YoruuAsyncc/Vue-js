import { api } from "./api";
import type { Product } from "../types/product";
import type { ProductSchemaType } from "../schemas/product.schema";

export const productService = {
  async getAll() {
    const res = await api.get<Product[]>("/products");
    return res.data;
  },

  async create(product: ProductSchemaType) {
    const res = await api.post<Product>("/products", product);
    return res.data;
  },

  async update(id: number, product: ProductSchemaType) {
    const res = await api.patch<Product>(`/products/${id}`, product);
    return res.data;
  },

  async delete(id: number) {
    await api.delete(`/products/${id}`);
  },
};
