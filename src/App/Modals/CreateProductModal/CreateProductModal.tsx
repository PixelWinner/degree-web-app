import React, { FC, useId } from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { ModalButtonsContainer } from "@utils/styles/ModalButtonsConatiner.styled";
import { ModalForm } from "@utils/styles/ModalForm.styled";
import { Field } from "@utils/typings/enums/common.enums";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { Body2Typography, H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

type CreateProductModalProps = {
    modalHook: ModalHookReturns;
};

const CreateProductModal: FC<CreateProductModalProps> = ({ modalHook }) => {
    const { t } = useTranslation();
    const formId = useId();

    const additionalValues = {};

    const initialValues = {
        [Field.Name]: "",
        [Field.PRICE_PER_UNIT]: "",
        count: "",
        storage: "",
        shelf: "",
        ...additionalValues
    };

    const formikHook = useFormik({
        initialValues,
        onSubmit: () => {},
        onReset: () => {
            modalHook.closeModal();
        }
    });

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t("modal.createProduct.title")}</H5Typography>

            <Body2Typography align="left" color="text.secondary">
                {t("modal.createProduct.description")}
            </Body2Typography>

            <ModalForm id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                <TextField {...getTextFieldProps({ t, formikHook, field: Field.Name })} />
                <TextField {...getTextFieldProps({ t, formikHook, field: Field.PRICE_PER_UNIT })} />
            </ModalForm>

            <ModalButtonsContainer>
                <Button variant="outlined" form={formId} type="reset">
                    {t("general.cancel")}
                </Button>
                <Button isLoading={false} form={formId} type="submit">
                    {t("general.confirm")}
                </Button>
            </ModalButtonsContainer>
        </Modal>
    );
};

export default CreateProductModal;
