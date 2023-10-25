import { z } from "zod";

import { NameSchema } from "@utils/typings/schemas/common.schemas";

export const UserStorageSchema = z.object({ id: z.number(), name: z.string(), createdAt: z.string() });

export const CreateStorageDtoSchema = z.object({ name: NameSchema });

export const UpdateStorageDtoSchema = z.object({ id: z.number(), name: NameSchema });
