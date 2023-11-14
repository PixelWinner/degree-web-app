import { TFunction } from "i18next";

export const getValueWithWeightUnit = (value: number, t: TFunction): string => {
    return `${value}${t("units.kg")}`;
};
