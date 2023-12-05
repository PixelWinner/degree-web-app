import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { DateStringSchema, StringSchema } from "@utils/typings/schemas/common.schemas";

export const ShelfSchema = z.object({
    id: z.number(),
    name: StringSchema,
    storageId: z.number(),
    createdAt: DateStringSchema,
    updatedAt: DateStringSchema,
    length: z.number(),
    width: z.number(),
    height: z.number(),
    maxWeight: z.number(),
    availableWeight: z.number(),
    maxVolume: z.number(),
    availableVolume: z.number()
});

export const CreateShelfDtoSchema = z.object({
    storageId: z.number(),
    name: StringSchema,
    length: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    width: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    height: z.number().min(0.001, getTranslatedValidationMessage("invalidSize")),
    maxWeight: z.number().min(0.001, getTranslatedValidationMessage("invalidWeight"))
});

export const UpdateShelfDtoSchema = z.object({ id: z.number(), name: StringSchema, storageId: z.number() });
