import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { DateStringSchema, DynamicFieldSchema, EmailSchema, PhoneNumber, StringSchema } from "@utils/typings/schemas/common.schemas";

export const ProductSchema = z.object({
    id: z.number(),
    shelfId: z.number(),
    name: StringSchema,
    amount: z.number().min(1, getTranslatedValidationMessage("invalidAmount")),
    pricePerUnit: z.number().min(0.001, getTranslatedValidationMessage("invalidPrice")),
    weightPerUnit: z.number().min(1, getTranslatedValidationMessage("invalidWeight")),
    length: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    width: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    height: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    properties: z.array(DynamicFieldSchema),
    createdAt: DateStringSchema,
    updatedAt: DateStringSchema
});

export const GetProductsResponseSchema = z.object({
    totalProducts: z.number(),
    totalPages: z.number(),
    products: z.array(ProductSchema)
});

export const CreateProductDtoSchema = z.object({
    name: StringSchema,
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
        shelfName: StringSchema,
        storageId: z.number(),
        storageName: StringSchema
    })
    .merge(ProductSchema);

export const SupplyProductSchema = CreateProductDtoSchema.omit({ shelfId: true });

export const SupplierInfoSchema = z.object({
    [Field.FULL_COMPANY_NAME]: StringSchema,
    [Field.LEGAL_ADDRESS]: StringSchema,
    [Field.TIN]: StringSchema,
    [Field.USREOU]: StringSchema,
    [Field.EMAIL]: EmailSchema,
    [Field.PHONE_NUMBER]: PhoneNumber
});

export const CreateSupplyDtoSchema = z.object({ products: z.array(SupplyProductSchema) }).merge(SupplierInfoSchema);
