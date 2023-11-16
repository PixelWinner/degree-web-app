import { TFunction } from "i18next";

export const getValueWithSizeUnit = (value: number, t: TFunction): string => {
    return `${value}${t("units.size")}`;
};

export const getValueWithWeightUnit = (value: number, t: TFunction): string => {
    return `${value}${t("units.weight")}`;
};

export const getValueWithVolumeUnit = (value: number, t: TFunction): string => {
    return `${value}${t("units.volume")}`;
};

export const getValueWithCurrency = (value: number, t: TFunction): string => {
    return `${value}${t("currencies.uah")}`;
};
