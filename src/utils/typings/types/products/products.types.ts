import { z } from "zod";

import { CreateProductDtoSchema, DeleteProductDtoSchema, ProductSchema, UpdateProductDtoSchema } from "@utils/typings/schemas/products/products.schemas";

export type Product = z.infer<typeof ProductSchema>;

export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;

export type UpdateProductDto = z.infer<typeof UpdateProductDtoSchema>;

export type DeleteProductDto = z.infer<typeof DeleteProductDtoSchema>;
