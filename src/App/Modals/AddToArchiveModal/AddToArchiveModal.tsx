import React, { FC, useId } from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { productsApi } from "@store/apis/products.api";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { FormContainer } from "@utils/styles/FormContainer.styled";
import { ModalButtonsContainer } from "@utils/styles/ModalButtonsConatiner.styled";
import { Field } from "@utils/typings/enums/common.enums";
import { AddToArchiveDtoSchema } from "@utils/typings/schemas/products/products.schemas";
import { AddToArchiveDto } from "@utils/typings/types/products/products.types";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { Body1Typography, H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

type AddToArchiveModalProps = {
    modalHook: ModalHookReturns;
    productId: number;
};

const AddToArchiveModal: FC<AddToArchiveModalProps> = ({ modalHook, productId }) => {
    const { t } = useTranslation();
    const [addToArchive, { isLoading }] = productsApi.useAddToArchiveMutation();
    const formId = useId();

    const initialValues: AddToArchiveDto = {
        productId,
        reason: "",
        amount: 0,
        date: new Date()
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, formikHelpers) => {
            await addToArchive(values).unwrap();
            formikHelpers.resetForm();
            modalHook.closeModal();
        },
        onReset: () => {
            modalHook.closeModal();
        }
    });

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t("modal.addToArchive.title")}</H5Typography>
            <Body1Typography>{t("modal.addToArchive.description")}</Body1Typography>

            <FormContainer id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                <TextField multiline minRows={3} fullWidth {...getTextFieldProps({ field: Field.REASON, formikHook, t })} />
                <TextField {...getTextFieldProps({ field: Field.AMOUNT, formikHook, t })} />
            </FormContainer>

            <ModalButtonsContainer>
                <Button variant="outlined" form={formId} type="reset">
                    {t("general.cancel")}
                </Button>
                <Button isLoading={isLoading} form={formId} type="submit">
                    {t("general.confirm")}
                </Button>
            </ModalButtonsContainer>
        </Modal>
    );
};

export default AddToArchiveModal;

const validationSchema = toFormikValidationSchema(AddToArchiveDtoSchema);
