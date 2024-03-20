import { z } from "zod";

import {
    AddToArchiveDtoSchema,
    ArchiveRecordSchema,
    CreateProductDtoSchema,
    DeleteProductDtoSchema,
    ExtendedSearchProductSchema,
    GetProductsResponseSchema,
    ProductSchema,
    UpdateProductDtoSchema
} from "@utils/typings/schemas/products/products.schemas";

export type Product = z.infer<typeof ProductSchema>;

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;

export type GetProductsQuery = {
    shelfId: number;
    page: number;
    limit: number;
    name?: string;
};

export type GetArchivedProductsQuery = {
    page: number;
    limit: number;
    name?: string;
};

export type CreateProductDto = z.infer<typeof CreateProductDtoSchema>;

export type UpdateProductDto = z.infer<typeof UpdateProductDtoSchema>;

export type DeleteProductDto = z.infer<typeof DeleteProductDtoSchema>;

export type ExtendedSearchProduct = z.infer<typeof ExtendedSearchProductSchema>;

export type AddToArchiveDto = z.infer<typeof AddToArchiveDtoSchema>;

export type ArchiveRecord = z.infer<typeof ArchiveRecordSchema>;

export type DeleteArchiveRecordDto = {
    productId: number;
} & ArchiveRecord;
