import styled from "styled-components";

import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import get from "lodash/get";

import { FormikValues } from "formik";

import MuiCloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { DynamicField } from "@utils/typings/types/common.types";

import Button from "@components/Button";
import TextField from "@components/TextField";

const CloseIcon = styled(MuiCloseIcon)`
    cursor: pointer;
`;

const TextFieldsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`;

type HandleAddField = () => void;

type HandleRemoveField = (index: number) => void;

type UseDynamicFieldsReturns = {
    handleAddField: HandleAddField;
    dynamicTextFields: JSX.Element[];
    addButton: JSX.Element;
};

type UseDynamicFieldsHook = (formikHook: FormikValues, formikFieldKey: string) => UseDynamicFieldsReturns;
export const useDynamicFields: UseDynamicFieldsHook = (formikHook, formikFieldKey) => {
    const { t } = useTranslation();
    const formikFieldValues: DynamicField[] = get(formikHook.values, formikFieldKey);

    const handleAddField: HandleAddField = useCallback(() => {
        formikHook.setFieldValue(formikFieldKey, [...formikFieldValues, { label: "", value: "" }]);
    }, [formikFieldValues, formikFieldKey]);

    const handleRemoveField: HandleRemoveField = useCallback(
        (index) => {
            formikHook.setFieldValue(formikFieldKey, formikFieldValues.toSpliced(index, 1));
        },
        [formikFieldValues, formikFieldKey]
    );

    const dynamicTextFields = useMemo(
        () =>
            formikFieldValues?.map((_, index) => {
                return (
                    <TextFieldsContainer key={index}>
                        <TextField {...getTextFieldProps({ formikHook, field: "label", t, pathToValue: getValuePath(formikFieldKey, index, "label") })} />
                        <TextField {...getTextFieldProps({ formikHook, field: "value", t, pathToValue: getValuePath(formikFieldKey, index, "value") })} />
                        <CloseIcon onClick={() => handleRemoveField(index)} />
                    </TextFieldsContainer>
                );
            }),
        [formikHook, formikFieldValues, formikFieldKey]
    );

    const addButton = useMemo(() => <Button onClick={handleAddField}>{t("general.addField")}</Button>, [handleAddField]);

    return {
        handleAddField,
        dynamicTextFields,
        addButton
    };
};

const getValuePath = (key: string, index: number, value: string) => `${key}.${index}.${value}`;
