import { z } from "zod";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";

export const NameSchema = z.string().min(1, getTranslatedValidationMessage("invalidLength")).max(32, getTranslatedValidationMessage("invalidLength"));

export const EmailSchema = z.string().email(getTranslatedValidationMessage("invalidEmail"));

export const PasswordSchema = z.string().min(8, getTranslatedValidationMessage("invalidLength")).max(32, getTranslatedValidationMessage("invalidLength"));

export const MessageResponseSchema = z.object({ message: z.string().min(1) });
