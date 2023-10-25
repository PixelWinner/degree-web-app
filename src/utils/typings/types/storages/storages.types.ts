import { z } from "zod";

import { CreateStorageDtoSchema, UpdateStorageDtoSchema, UserStorageSchema } from "@utils/typings/schemas/storage/storage.schemas";

export type UserStorage = z.infer<typeof UserStorageSchema>;

export type CreateStorageDto = z.infer<typeof CreateStorageDtoSchema>;

export type UpdateStorageDto = z.infer<typeof UpdateStorageDtoSchema>;

export type DeleteStorageDto = { id: number };
