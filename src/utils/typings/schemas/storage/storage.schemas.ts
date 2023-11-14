import { z } from "zod";

import { EmailSchema, NameSchema } from "@utils/typings/schemas/common.schemas";
import { UserDataResponseSchema } from "@utils/typings/schemas/userData/userData.schemas";

export const StorageSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    ownerId: z.number()
});

export const CreateStorageDtoSchema = z.object({ name: NameSchema, address: z.string() });

export const UpdateStorageDtoSchema = z.object({ id: z.number(), name: NameSchema });

export const StorageDataSchema = z.object({ storage: StorageSchema, users: z.array(UserDataResponseSchema) });

export const AddUserToStorageDtoSchema = z.object({ storageId: z.number(), email: EmailSchema });
