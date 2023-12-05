import { omit } from "lodash";

import React, { FC, useId } from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import styled from "styled-components/macro";

import { productsApi } from "@store/apis/products.api";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { useDynamicFields } from "@utils/hooks/useDynamicFields.hook";
import { ModalButtonsContainer } from "@utils/styles/ModalButtonsConatiner.styled";
import { ModalForm } from "@utils/styles/ModalForm.styled";
import { Field } from "@utils/typings/enums/common.enums";
import { CreateProductDtoSchema } from "@utils/typings/schemas/products/products.schemas";
import { CreateProductDto } from "@utils/typings/types/products/products.types";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { Body2Typography, H5Typography, H6Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

const StyledModalForm = styled(ModalForm)`
    padding-bottom: 8px;
`;

type CreateProductModalProps = {
    modalHook: ModalHookReturns;
    shelfId: number;
};

const CreateProductModal: FC<CreateProductModalProps> = ({ modalHook, shelfId }) => {
    const { t } = useTranslation();
    const formId = useId();
    const [createProduct, { isLoading }] = productsApi.useCreateProductMutation();

    const initialValues: CreateProductDto = {
        [Field.Name]: "",
        [Field.AMOUNT]: 0,
        [Field.PRICE_PER_UNIT]: 0,
        [Field.WEIGHT_PER_UNIT]: 0,
        [Field.LENGTH]: 0,
        [Field.WIDTH]: 0,
        [Field.HEIGHT]: 0,
        shelfId,
        properties: []
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, formikHelpers) => {
            await createProduct(values).unwrap();
            formikHelpers.resetForm();
            modalHook.closeModal();
        },
        onReset: () => {
            modalHook.closeModal();
        }
    });

    const { dynamicTextFields, addButton } = useDynamicFields(formikHook, "properties");

    const textFields = Object.keys(omit(initialValues, ["shelfId", "properties"])).map((field) => (
        <TextField
            key={field}
            fullWidth
            {...getTextFieldProps({
                t,
                formikHook,
                field
            })}
        />
    ));

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t("modal.createProduct.title")}</H5Typography>

            <Body2Typography align="left" color="text.secondary">
                {t("modal.createProduct.description")}
            </Body2Typography>

            <StyledModalForm id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                {textFields}

                {!!dynamicTextFields.length && <H6Typography>{t("general.additionalParameters")}</H6Typography>}

                {dynamicTextFields}
                {addButton}
            </StyledModalForm>

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

export default CreateProductModal;

const validationSchema = toFormikValidationSchema(CreateProductDtoSchema);
