import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";

export const StringSchema = z.string({ required_error: getTranslatedValidationMessage("invalidString") });

export const DateStringSchema = StringSchema.datetime();

export const NameSchema = StringSchema.min(1, getTranslatedValidationMessage("invalidLength")).max(32, getTranslatedValidationMessage("invalidLength"));

export const EmailSchema = StringSchema.email(getTranslatedValidationMessage("invalidEmail"));

export const PasswordSchema = StringSchema.min(8, getTranslatedValidationMessage("invalidLength")).max(32, getTranslatedValidationMessage("invalidLength"));

export const MessageResponseSchema = z.object({ message: StringSchema });

export const PhoneNumber = StringSchema.regex(/^\+\d{1,3}\s?\d{4,14}(?:x.+)?$/);

export const DynamicFieldSchema = z.object({ label: StringSchema, value: StringSchema });
