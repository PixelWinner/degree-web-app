import { TFunction, TReturnOptionalNull } from "i18next";

import React from "react";

import { FormikHandlers, FormikValues } from "formik";

import InputAdornment from "@mui/material/InputAdornment";

import { getFieldError, getIsFieldError } from "@utils/helpers/getFieldError.helper";
import { Field } from "@utils/typings/enums/common.enums";

type GetTextFieldProps = {
    field: Field | string;
    formikHook: FormikValues;
    t: TFunction;
    label?: TReturnOptionalNull;
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
export const getTextFieldProps: GetTextFieldPropsHelper = ({ field, formikHook, t, label, ...rest }) => ({
    id: field,
    name: field,
    label: label ?? t(`general.${field}`),
    autoComplete: field,
    type: getTextFieldType(formikHook.values[field]),
    value: formikHook.values[field],
    onChange: formikHook.handleChange,
    error: getIsFieldError({ form: formikHook, key: field }),
    helperText: getFieldError({ form: formikHook, key: field }),
    InputProps: {
        endAdornment: getTextFieldUnits(field, t)
    },
    ...rest
});

const getTextFieldType = (value: unknown): string | undefined => {
    if (typeof value === "string") {
        return "text";
    }

    if (typeof value === "number") {
        return "number";
    }
};

export const getTextFieldUnits = (field: string | Field, t: TFunction) => {
    if (field === Field.HEIGHT || field === Field.WIDTH || field === Field.LENGTH) {
        return <InputAdornment position="end">{t("units.m")}</InputAdornment>;
    }

    if (field === Field.MAX_WEIGHT) {
        return <InputAdornment position="end">{t("units.kg")}</InputAdornment>;
    }
};
