import { z } from "zod";

import {
    AddUserToStorageDtoSchema,
    CreateStorageDtoSchema,
    GetStorageShelfListResponseSchema,
    StorageDataSchema,
    StorageSchema,
    UpdateStorageDtoSchema
} from "@utils/typings/schemas/storage/storage.schemas";

export type TStorage = z.infer<typeof StorageSchema>;

export type CreateStorageDto = z.infer<typeof CreateStorageDtoSchema>;

export type UpdateStorageDto = z.infer<typeof UpdateStorageDtoSchema>;

export type DeleteStorageDto = { id: number };

export type StorageData = z.infer<typeof StorageDataSchema>;

export type DeleteUserFormStorageDto = {
    id: number;
    userId: number;
};

export type AddUserToStorageDto = z.infer<typeof AddUserToStorageDtoSchema>;

export type GetStorageShelfListResponse = z.infer<typeof GetStorageShelfListResponseSchema>;
