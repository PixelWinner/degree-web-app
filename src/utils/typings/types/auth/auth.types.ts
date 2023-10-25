import { z } from "zod";

import { LoginDtoSchema, RegisterDtoSchema, RegisterFormSchema, TokenResponseSchema } from "@utils/typings/schemas/auth/auth.schemas";

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export type TokenResponse = z.infer<typeof TokenResponseSchema>;

export type RegisterForm = z.infer<typeof RegisterFormSchema>;
