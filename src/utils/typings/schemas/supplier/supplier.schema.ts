import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { DateStringSchema, DynamicFieldSchema, EmailSchema, PhoneNumber, StringSchema } from "@utils/typings/schemas/common.schemas";

export const SupplierSchema = z.object({
    [Field.FULL_COMPANY_NAME]: StringSchema,
    [Field.LEGAL_ADDRESS]: StringSchema,
    [Field.TIN]: StringSchema,
    [Field.USREOU]: StringSchema,
    [Field.EMAIL]: EmailSchema,
    [Field.PHONE_NUMBER]: PhoneNumber,
    createdAt: DateStringSchema,
    updatedAt: DateStringSchema
});

export const CreateSupplierDtoSchema = SupplierSchema.omit({ createdAt: true, updatedAt: true });

export const SupplyProductSchema = z.object({
    name: StringSchema,
    amount: z.number().min(1, getTranslatedValidationMessage("invalidAmount")),
    pricePerUnit: z.number().min(0.001, getTranslatedValidationMessage("invalidPrice")),
    weightPerUnit: z.number().min(1, getTranslatedValidationMessage("invalidWeight")),
    length: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    width: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    height: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    properties: z.array(DynamicFieldSchema)
});

export const CreateSupplyDtoSchema = z.object({ products: z.array(SupplyProductSchema) }).merge(CreateSupplierDtoSchema);

export const GetStatisticsDtoSchema = z.object({ startDate: DateStringSchema, endDate: DateStringSchema });
