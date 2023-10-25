import { z } from "zod";

export const ShelfSchema = z.object({ id: z.number(), name: z.string(), storageId: z.number(), createdAt: z.string() });

export const CreateShelfDtoSchema = z.object({ storageId: z.number(), name: z.string() });

export const UpdateShelfDtoSchema = z.object({ id: z.number(), name: z.string(), storageId: z.number() });
