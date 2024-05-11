import { z } from "zod";

import {
    ChangePasswordDtoSchema,
    LoginDtoSchema,
    RecoverPasswordDtoSchema,
    RegisterDtoSchema,
    RegisterFormSchema, ResetPasswordDtoSchema,
    TokenResponseSchema
} from "@utils/typings/schemas/auth/auth.schemas";

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export type TokenResponse = z.infer<typeof TokenResponseSchema>;

export type RegisterForm = z.infer<typeof RegisterFormSchema>;

export type ChangePasswordDto = z.infer<typeof ChangePasswordDtoSchema>;

export type RecoverPasswordDto = z.infer<typeof RecoverPasswordDtoSchema>

export type ResetPasswordDto = z.infer<typeof ResetPasswordDtoSchema>;


