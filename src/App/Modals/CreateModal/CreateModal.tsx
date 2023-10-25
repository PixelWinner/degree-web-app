import React, { FC, useId } from "react";
import { useTranslation } from "react-i18next";

import { FormikValues } from "formik";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { Field } from "@utils/typings/enums/common.enums";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { Body2Typography, H5Typography } from "@components/Typography";

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
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    gap: 8px;
`;

type CreateModalProps = {
    modalHook: ModalHookReturns;
    titleTranslationKey: string;
    descriptionTranslationKey: string;
    formikHook: FormikValues;
    fields: Field[];
    isLoading: boolean;
};

const CreateModal: FC<CreateModalProps> = ({ modalHook, titleTranslationKey, descriptionTranslationKey, formikHook, fields, isLoading }) => {
    const { t } = useTranslation();
    const formId = useId();

    const textFields = fields.map((field) => <TextField key={field} fullWidth {...getTextFieldProps({ t, formikHook, field })} />);

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t(titleTranslationKey)}</H5Typography>

            <Body2Typography align="left" color="text.secondary">
                {t(descriptionTranslationKey)}
            </Body2Typography>

            <Form id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                {textFields}
            </Form>

            <ButtonsContainer>
                <Button variant="outlined" form={formId} type="reset">
                    {t("general.cancel")}
                </Button>
                <Button isLoading={isLoading} form={formId} type="submit">
                    {t("general.confirm")}
                </Button>
            </ButtonsContainer>
        </Modal>
    );
};

export default CreateModal;
