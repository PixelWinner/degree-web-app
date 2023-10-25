import { z } from "zod";

import { CreateShelfDtoSchema, ShelfSchema, UpdateShelfDtoSchema } from "@utils/typings/schemas/shelves/shelves.schemas";

export type UserShelf = z.infer<typeof ShelfSchema>;

export type CreateShelfDto = z.infer<typeof CreateShelfDtoSchema>;

export type UpdateShelfDto = z.infer<typeof UpdateShelfDtoSchema>;

export type DeleteShelfDto = { id: number; storageId: number };
