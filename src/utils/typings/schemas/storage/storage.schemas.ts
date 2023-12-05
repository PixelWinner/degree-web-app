import { z } from "zod";

import { DateStringSchema, EmailSchema, NameSchema, StringSchema } from "@utils/typings/schemas/common.schemas";
import { UserDataResponseSchema } from "@utils/typings/schemas/userData/userData.schemas";

export const StorageSchema = z.object({
    id: z.number(),
    name: StringSchema,
    address: StringSchema,
    createdAt: DateStringSchema,
    updatedAt: DateStringSchema,
    ownerId: z.number()
});

export const CreateStorageDtoSchema = z.object({ name: NameSchema, address: StringSchema });

export const UpdateStorageDtoSchema = z.object({ id: z.number(), name: NameSchema });

export const StorageDataSchema = z.object({ storage: StorageSchema, users: z.array(UserDataResponseSchema) });

export const AddUserToStorageDtoSchema = z.object({ storageId: z.number(), email: EmailSchema });

export const GetStorageShelfListResponseSchema = z.array(
    z.object({
        id: z.number(),
        name: StringSchema,
        shelves: z.array(
            z.object({
                id: z.number(),
                name: StringSchema
            })
        )
    })
);
