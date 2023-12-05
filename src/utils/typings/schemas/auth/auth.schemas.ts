import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { EmailSchema, NameSchema, PasswordSchema, StringSchema } from "@utils/typings/schemas/common.schemas";

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
