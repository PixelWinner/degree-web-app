import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { DynamicFieldSchema, EmailSchema, PhoneNumber } from "@utils/typings/schemas/common.schemas";

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
    properties: z.array(DynamicFieldSchema),
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
    properties: z.array(DynamicFieldSchema)
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

export const SupplierInfoSchema = z.object({
    [Field.FULL_COMPANY_NAME]: z.string(),
    [Field.LEGAL_ADDRESS]: z.string(),
    [Field.TIN]: z.string(),
    [Field.USREOU]: z.string(),
    [Field.EMAIL]: EmailSchema,
    [Field.PHONE_NUMBER]: PhoneNumber
});

export const CreateSupplyDtoSchema = z.object({ products: z.array(CreateProductDtoSchema) }).merge(SupplierInfoSchema);
