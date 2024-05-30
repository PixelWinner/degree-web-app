import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { DateStringSchema, DynamicFieldSchema, StringSchema } from "@utils/typings/schemas/common.schemas";
import { CreateSupplierDtoSchema, SupplierSchema } from "@utils/typings/schemas/supplier/supplier.schema";
import { ShipmentSchema } from "@utils/typings/schemas/shipments/shipments.schemas";

export const AddToArchiveDtoSchema = z.object({
    productId: z.number(),
    reason: StringSchema.min(3, getTranslatedValidationMessage("invalidReason")),
    amount: z.number().min(0, getTranslatedValidationMessage("invalidAmount")),
    date: z.date()
});

export const ArchiveRecordSchema = z.object({
    reason: z.string().min(3, getTranslatedValidationMessage("invalidReason")),
    amount: z.number().min(1, getTranslatedValidationMessage("invalidAmount")),
    date: DateStringSchema
});

export const ProductSchema = z.object({
    id: z.number(),
    shelfId: z.number(),
    name: StringSchema,
    amount: z.number(),
    pricePerUnit: z.number().min(0.001, getTranslatedValidationMessage("invalidPrice")),
    weightPerUnit: z.number().min(1, getTranslatedValidationMessage("invalidWeight")),
    length: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    width: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    height: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    properties: z.array(DynamicFieldSchema),
    archiveRecords: z.array(ArchiveRecordSchema).nullable(),
    supplierId: z.number(),
    supplier: SupplierSchema,
    createdAt: DateStringSchema,
    updatedAt: DateStringSchema,
    shipments:z.array(ShipmentSchema),
    initialAmount: z.number().min(0, getTranslatedValidationMessage("invalidAmount"))
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
    supplier: CreateSupplierDtoSchema,
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
