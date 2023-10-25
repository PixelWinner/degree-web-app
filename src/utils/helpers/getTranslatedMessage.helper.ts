import { t } from "i18next";

export const getTranslatedValidationMessage = (message: string): string => {
    const translateKey = `validation.${message}`;
    const translatedMessage = t(translateKey);
    const isValidTranslation = translatedMessage !== translateKey;

    if (!isValidTranslation) {
        return message;
    }

    return translatedMessage;
};
