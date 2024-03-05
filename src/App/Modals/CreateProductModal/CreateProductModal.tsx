import { omit } from "lodash";

import React, { FC, useId } from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

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

const StyledModal = styled(Modal)`
    & p {
        text-align: center;
    }
`;

const StyledModalForm = styled(ModalForm)`
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 8px;
`;

const Wrapper = styled(Box)`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: fit-content;
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
        supplier: {
            [Field.FULL_COMPANY_NAME]: "",
            [Field.LEGAL_ADDRESS]: "",
            [Field.TIN]: "",
            [Field.USREOU]: "",
            [Field.EMAIL]: "",
            [Field.PHONE_NUMBER]: ""
        },
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

    const textFields = Object.keys(omit(initialValues, ["shelfId", "properties", "supplier"])).map((field) => (
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

    const supplierTextFields = Object.keys(initialValues.supplier).map((field) => (
        <TextField
            key={field}
            fullWidth
            {...getTextFieldProps({
                t,
                formikHook,
                field,
                pathToValue: `supplier.${field}`
            })}
        />
    ));

    return (
        <StyledModal {...modalHook.modalProps}>
            <H5Typography>{t("modal.createProduct.title")}</H5Typography>

            <Body2Typography align="left" color="text.secondary">
                {t("modal.createProduct.description")}
            </Body2Typography>

            <StyledModalForm id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                <Wrapper>
                    <H6Typography>{t("general.supplierInfo")}</H6Typography>

                    {supplierTextFields}
                </Wrapper>

                <Wrapper>
                    <H6Typography>{t("general.productParams")}</H6Typography>

                    {textFields}

                    {!!dynamicTextFields.length && <H6Typography>{t("general.additionalParameters")}</H6Typography>}

                    {dynamicTextFields}
                    {addButton}
                </Wrapper>
            </StyledModalForm>

            <ModalButtonsContainer>
                <Button variant="outlined" form={formId} type="reset">
                    {t("general.cancel")}
                </Button>
                <Button isLoading={isLoading} form={formId} type="submit">
                    {t("general.confirm")}
                </Button>
            </ModalButtonsContainer>
        </StyledModal>
    );
};

export default CreateProductModal;

const validationSchema = toFormikValidationSchema(CreateProductDtoSchema);
