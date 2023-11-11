import { z } from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    shelfId: z.number(),
    name: z.string(),
    properties: z.object({}).catchall(z.string()),
    createdAt: z.string(),
    updatedAt: z.string()
});
