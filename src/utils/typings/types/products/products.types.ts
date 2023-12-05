import { z } from "zod";

import {
    CreateProductDtoSchema,
    CreateSupplyDtoSchema,
    DeleteProductDtoSchema,
    ExtendedSearchProductSchema,
    GetProductsResponseSchema,
    ProductSchema,
    SupplierInfoSchema,
    UpdateProductDtoSchema
} from "@utils/typings/schemas/products/products.schemas";

export type Product = z.infer<typeof ProductSchema>;

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;

export type GetProductsParams = {
    shelfId: number;
    page: number;
    limit: number;
};

export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;

export type UpdateProductDto = z.infer<typeof UpdateProductDtoSchema>;

export type DeleteProductDto = z.infer<typeof DeleteProductDtoSchema>;

export type ExtendedSearchProduct = z.infer<typeof ExtendedSearchProductSchema>;

export type SupplierInfo = z.infer<typeof SupplierInfoSchema>;

export type CreateSupplyDto = z.infer<typeof CreateSupplyDtoSchema>;
