import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name Tidak Boleh kosong").trim(),
  price: z.number().positive("harga harus lebih besar dari 0"),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
