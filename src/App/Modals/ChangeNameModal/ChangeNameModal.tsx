import styled from "styled-components";

import React, { FC, useId, useState } from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { Box } from "@mui/material";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { NameSchema } from "@utils/typings/schemas/common.schemas";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

const ButtonsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    width: 100%;
`;

const Form = styled.form`
    width: 100%;
`;

type Values = { id: number; name: string; storageId?: number };

export type OnChangeName = (values: Values) => Promise<unknown>;

type ChangeNameModalProps = {
    modalHook: ModalHookReturns;
    restRequestProps: Omit<Values, "name">;
    onConfirm: OnChangeName;
    initialName: string;
    onCancel?: () => void;
};

const ChangeNameModal: FC<ChangeNameModalProps> = ({ modalHook, restRequestProps, onConfirm, onCancel, initialName }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const formId = useId();

    const initialValues = {
        ...restRequestProps,
        [Field.Name]: initialName
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            await onConfirm(values);
            setIsLoading(false);
            modalHook.closeModal();
        },
        onReset: () => {
            onCancel?.();
            modalHook.closeModal();
        }
    });

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t("modal.changeName.title")}</H5Typography>

            <Form id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                <TextField fullWidth {...getTextFieldProps({ formikHook, t, field: Field.Name })} />
            </Form>

            <ButtonsContainer>
                <Button type="reset" form={formId} variant="outlined">
                    {t("general.cancel")}
                </Button>
                <Button type="submit" form={formId} isLoading={isLoading}>
                    {t("general.confirm")}
                </Button>
            </ButtonsContainer>
        </Modal>
    );
};

export default ChangeNameModal;

const validationSchema = toFormikValidationSchema(z.object({ [Field.Name]: NameSchema }));
