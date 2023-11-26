import { useTranslation } from "react-i18next";

import { enUS, ukUA } from "@mui/material/locale";

import { Locale } from "@utils/typings/enums/common.enums";

export const useMuiLocale = () => {
    const { i18n } = useTranslation();

    switch (i18n.language) {
        case Locale.EN:
            return enUS;
        case Locale.UK:
            return ukUA;
        default:
            return enUS;
    }
};
