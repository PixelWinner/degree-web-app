import { useTranslation } from "react-i18next";

import en from "date-fns/locale/en-US";
import uk from "date-fns/locale/uk";

import { Locale } from "@utils/typings/enums/common.enums";

export const useDateFnsLocale = () => {
    const { i18n } = useTranslation();

    switch (i18n.language) {
        case Locale.EN:
            return en;
        case Locale.UK:
            return uk;
        default:
            return en;
    }
};
