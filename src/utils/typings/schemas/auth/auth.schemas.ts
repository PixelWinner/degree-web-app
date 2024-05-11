import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { EmailSchema, NameSchema, PasswordSchema, RecoveryCodeSchema, StringSchema } from "@utils/typings/schemas/common.schemas";

export const LoginDtoSchema = z.object({
    [Field.EMAIL]: EmailSchema,
    [Field.PASSWORD]: PasswordSchema
});

export const TokenResponseSchema = z.object({ token: StringSchema });

export const RegisterDtoSchema = z.object({
    [Field.Name]: NameSchema,
    [Field.EMAIL]: EmailSchema,
    [Field.PASSWORD]: PasswordSchema
});

export const RegisterFormSchema = RegisterDtoSchema.merge(z.object({ [Field.REPEAT_PASSWORD]: PasswordSchema })).refine(
    (data) => data[Field.REPEAT_PASSWORD] === data[Field.PASSWORD],
    {
        message: getTranslatedValidationMessage("passwordDoNotMatch"),
        path: [Field.REPEAT_PASSWORD, Field.PASSWORD]
    }
);

export const ChangePasswordDtoSchema = z.object({
    [Field.OLD_PASSWORD]: PasswordSchema,
    [Field.NEW_PASSWORD]: PasswordSchema
});

export const ChangePasswordFormSchema = ChangePasswordDtoSchema.refine((data) => data[Field.OLD_PASSWORD] !== data[Field.NEW_PASSWORD],
    {
        message: getTranslatedValidationMessage("passwordsMustNotMatch"),
        path: [Field.OLD_PASSWORD, Field.NEW_PASSWORD]
    });

export const RecoverPasswordDtoSchema = z.object({ email: EmailSchema });

export const ResetPasswordDtoSchema = z.object({ email: EmailSchema, recoveryCode: RecoveryCodeSchema, newPassword: PasswordSchema });