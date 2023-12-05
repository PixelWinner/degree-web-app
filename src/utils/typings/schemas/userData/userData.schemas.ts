import { z } from "zod";

import { EmailSchema, StringSchema } from "@utils/typings/schemas/common.schemas";

export const UserDataResponseSchema = z.object({
    id: z.number(),
    name: StringSchema,
    email: EmailSchema
});
