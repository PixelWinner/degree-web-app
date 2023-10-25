import i18n, { ResourceLanguage } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";

import { Locale } from "@utils/typings/enums/common.enums";

import enLanguage from "./locales/en/translation.json";
import ukLanguage from "./locales/uk/translation.json";

const resources: { [key in Locale]: ResourceLanguage } = {
    [Locale.EN]: {
        translation: enLanguage
    },
    [Locale.UK]: {
        translation: ukLanguage
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        supportedLngs: [Locale.EN, Locale.UK],
        fallbackLng: Locale.UK,
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"]
        }
    });

export default i18n;
