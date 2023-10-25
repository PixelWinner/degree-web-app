import { z } from "zod";

export const UserDataResponseSchema = z.object({
    name: z.string(),
    email: z.string().email()
});
