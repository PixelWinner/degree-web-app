import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { FormikErrors, useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import styled from "styled-components/macro";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { SupplierInfoSchema } from "@utils/typings/schemas/products/products.schemas";
import { SupplierInfo } from "@utils/typings/types/products/products.types";

import TextField from "@components/TextField";

const StyledTextField = styled(TextField)`
    flex: 1;
    max-width: max-content;
    min-width: 164px;
`;

export type UseSupplierInfoReturns = {
    supplierInfo: SupplierInfo;
    textFields: JSX.Element[];
    validate: () => Promise<FormikErrors<SupplierInfo>>;
};

type UseSupplierInfoHook = () => UseSupplierInfoReturns;

export const useSupplierInfo: UseSupplierInfoHook = () => {
    const { t } = useTranslation();

    const initialValues: SupplierInfo = {
        [Field.FULL_COMPANY_NAME]: "",
        [Field.LEGAL_ADDRESS]: "",
        [Field.TIN]: "",
        [Field.USREOU]: "",
        [Field.EMAIL]: "",
        [Field.PHONE_NUMBER]: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: () => {}
    });

    const textFields = Object.keys(initialValues).map((field) => (
        <StyledTextField
            key={field}
            {...getTextFieldProps({
                t,
                formikHook,
                field
            })}
        />
    ));

    const validate = useCallback(async () => {
        formikHook.handleSubmit();

        return await formikHook.validateForm();
    }, [formikHook]);

    return {
        supplierInfo: formikHook.values,
        validate,
        textFields
    };
};

const validationSchema = toFormikValidationSchema(SupplierInfoSchema);
