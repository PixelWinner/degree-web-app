import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";

export const ProductSchema = z.object({
    id: z.number(),
    shelfId: z.number(),
    name: z.string(),
    amount: z.number().min(1, getTranslatedValidationMessage("invalidAmount")),
    pricePerUnit: z.number().min(0.001, getTranslatedValidationMessage("invalidPrice")),
    weightPerUnit: z.number().min(1, getTranslatedValidationMessage("invalidWeight")),
    length: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    width: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    height: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    properties: z.record(z.string(), z.string()),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const GetProductsResponseSchema = z.object({
    totalProducts: z.number(),
    totalPages: z.number(),
    products: z.array(ProductSchema)
});

export const CreateProductDtoSchema = z.object({
    name: z.string(),
    amount: z.number().min(1, getTranslatedValidationMessage("invalidAmount")),
    pricePerUnit: z.number().min(0.001, getTranslatedValidationMessage("invalidPrice")),
    weightPerUnit: z.number().min(1, getTranslatedValidationMessage("invalidWeight")),
    length: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    width: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    height: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    shelfId: z.number(),
    properties: z.record(z.string(), z.string())
});

export const UpdateProductDtoSchema = z.object({ id: z.number() }).merge(CreateProductDtoSchema);

export const DeleteProductDtoSchema = z.object({
    id: z.number(),
    shelfId: z.number()
});

export const ExtendedSearchProductSchema = z
    .object({
        shelfName: z.string(),
        storageId: z.number(),
        storageName: z.string()
    })
    .merge(ProductSchema);
