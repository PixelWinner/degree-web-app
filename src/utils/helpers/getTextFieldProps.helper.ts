import { TFunction, TReturnOptionalNull } from "i18next";

import { FormikHandlers, FormikValues } from "formik";

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
export const getTextFieldProps: GetTextFieldPropsHelper = ({ field, formikHook, t, label }) => ({
    id: field,
    name: field,
    label: label ?? t(`general.${field}`),
    autoComplete: field,
    value: formikHook.values[field],
    onChange: formikHook.handleChange,
    error: getIsFieldError({ form: formikHook, key: field }),
    helperText: getFieldError({ form: formikHook, key: field })
});
