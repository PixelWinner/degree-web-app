import React from "react";

import get from "lodash/get";

import { FormikHandlers, FormikValues } from "formik";

import InputAdornment from "@mui/material/InputAdornment";

import { TFunction } from "i18next";

import { getFieldError, getIsFieldError } from "@utils/helpers/getFieldError.helper";
import { Field } from "@utils/typings/enums/common.enums";

type GetTextFieldProps = {
    field: Field | string;
    formikHook: FormikValues;
    t: TFunction;
    pathToValue?: string;
    label?: string;
};

type GetTextFieldPropsReturns = {
    id: string;
    name: string;
    label: string;
    value: string | number;
    error: boolean;
    onChange: FormikHandlers["handleChange"];
    helperText: string | undefined;
};

export type GetTextFieldPropsHelper = (props: GetTextFieldProps) => GetTextFieldPropsReturns;
export const getTextFieldProps: GetTextFieldPropsHelper = ({ field, pathToValue, formikHook, t, label }) => ({
    id: pathToValue ?? field,
    name: pathToValue ?? field,
    label: label ?? t(`general.${field}`),
    autoComplete: field,
    type: getTextFieldType(formikHook, field),
    value: pathToValue ? get(formikHook.values, pathToValue) : formikHook.values[field],
    onChange: formikHook.handleChange,
    error: getIsFieldError({ form: formikHook, key: pathToValue ?? field }),
    helperText: getFieldError({ form: formikHook, key: pathToValue ?? field }),
    InputProps: {
        endAdornment: getTextFieldUnits(field, t)
    }
});

const getTextFieldType = (formikHook: FormikValues, field: string | Field): string => {
    const isNumberField =
        field === Field.HEIGHT ||
        field === Field.WIDTH ||
        field === Field.LENGTH ||
        field === Field.MAX_WEIGHT ||
        field === Field.WEIGHT_PER_UNIT ||
        field === Field.PRICE_PER_UNIT ||
        field === Field.AMOUNT;

    if (isNumberField) {
        return "number";
    }

    if (field === Field.EMAIL) {
        return "email";
    }

    if (field === Field.PASSWORD || field === Field.REPEAT_PASSWORD || field === Field.OLD_PASSWORD || field === Field.NEW_PASSWORD) {
        return "password";
    }

    if (typeof formikHook.values[field] === "string") {
        return "text";
    }

    if (typeof formikHook.values[field] === "number") {
        return "number";
    }

    return "text";
};

export const getTextFieldUnits = (field: string | Field, t: TFunction) => {
    if (field === Field.HEIGHT || field === Field.WIDTH || field === Field.LENGTH) {
        return <InputAdornment position="end">{t("units.size")}</InputAdornment>;
    }

    if (field === Field.MAX_WEIGHT || field === Field.WEIGHT_PER_UNIT) {
        return <InputAdornment position="end">{t("units.weight")}</InputAdornment>;
    }

    if (field === Field.PRICE_PER_UNIT) {
        return <InputAdornment position="end">{t("currencies.uah")}</InputAdornment>;
    }
};
