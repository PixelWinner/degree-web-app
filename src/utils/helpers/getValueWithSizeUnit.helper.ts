import { TFunction } from "i18next";

export const getValueWithSizeUnit = (value: number, t: TFunction): string => {
    return `${value}${t("units.m")}`;
};
