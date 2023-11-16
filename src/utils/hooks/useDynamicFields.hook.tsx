import styled from "styled-components";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FormikValues } from "formik";

import MuiCloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

import { getFieldError, getIsFieldError } from "@utils/helpers/getFieldError.helper";

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

type DynamicField = { id: number; label: string; value: string };

type HandleAddField = () => void;

type HandleRemoveField = (id: number) => void;

type HandleUpdateField = (id: number, part: string, newValue: unknown) => void;

type RenderTextFields = () => JSX.Element[];

type RenderAddButton = () => JSX.Element;

type useDynamicFieldsReturns = {
    handleAddField: HandleAddField;
    handleRemoveField: HandleRemoveField;
    handleUpdateField: HandleUpdateField;
    dynamicFields: DynamicField[];
    renderTextFields: RenderTextFields;
    renderAddButton: RenderAddButton;
};

type useDynamicFieldsHook = (formikHook: FormikValues, formikFieldKey: string) => useDynamicFieldsReturns;
export const useDynamicFields: useDynamicFieldsHook = (formikHook, formikFieldKey) => {
    const { t } = useTranslation();
    const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);

    useEffect(() => {
        //Add initial values to dynamicFields
        const initialValues = formikHook.values[formikFieldKey] ?? {};

        if (!Object.keys(initialValues).length) {
            return;
        }

        setDynamicFields([]);

        for (const key in initialValues) {
            setDynamicFields([...dynamicFields, { id: Math.random(), label: key, value: initialValues[key] }]);
        }
    }, []);

    useEffect(() => {
        //Set dynamicFields in formik value
        const newValues = dynamicFields.reduce((acc, field) => ({ ...acc, [field.label]: field.value }), {});

        formikHook.setFieldValue(formikFieldKey, newValues);
    }, [dynamicFields]);

    const handleAddField: HandleAddField = () => {
        setDynamicFields([...dynamicFields, { id: Math.random(), label: "", value: "" }]);
    };

    const handleRemoveField: HandleRemoveField = (id) => {
        setDynamicFields(dynamicFields.filter((field) => field.id !== id));
    };

    const handleUpdateField: HandleUpdateField = (id, part, newValue) => {
        setDynamicFields(dynamicFields.map((field) => (field.id === id ? { ...field, [part]: newValue } : field)));
    };

    const renderTextFields = () => {
        return dynamicFields.map((field) => {
            const isError =
                getIsFieldError({ form: formikHook, key: `properties.${field.label}` }) ||
                getIsFieldError({ form: formikHook, key: `properties.${field.value}` });

            const helperText =
                getFieldError({ form: formikHook, key: `properties.${field.label}` }) ?? getFieldError({ form: formikHook, key: `properties.${field.value}` });

            return (
                <TextFieldsContainer key={field.id}>
                    <TextField
                        id={String(field.id)}
                        type="text"
                        label={t("general.label")}
                        error={isError}
                        helperText={helperText}
                        value={field.label}
                        onChange={(e) => handleUpdateField(field.id, "label", e.target.value)}
                    />
                    <TextField
                        id={String(field.id)}
                        type="text"
                        label={t("general.value")}
                        error={isError}
                        helperText={helperText}
                        value={field.value}
                        onChange={(e) => handleUpdateField(field.id, "value", e.target.value)}
                    />
                    <CloseIcon onClick={() => handleRemoveField(field.id)} />
                </TextFieldsContainer>
            );
        });
    };

    const renderAddButton = () => {
        return <Button onClick={handleAddField}>{t("general.addField")}</Button>;
    };

    return {
        handleAddField,
        handleRemoveField,
        handleUpdateField,
        renderTextFields,
        renderAddButton,
        dynamicFields
    };
};
