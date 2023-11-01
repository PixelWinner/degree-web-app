import { z } from "zod";

export const UserDataResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
});
