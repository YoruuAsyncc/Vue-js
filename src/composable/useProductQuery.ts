import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { productService } from "../services/productService";
import type { ProductSchemaType } from "../schemas/product.schema";

export function useProductsQuery() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return productService.getAll();
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: ProductSchemaType) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return productService.create(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: ProductSchemaType;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return productService.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return {
    productsQuery,
    createProductMutation,
    deleteProductMutation,
    updateProductMutation,
  };
}
