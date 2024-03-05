import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import omit from "lodash/omit";

import { FormikValues } from "formik";

import styled from "styled-components/macro";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionSummary, Box, Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails } from "@mui/material";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { useDynamicFields } from "@utils/hooks/useDynamicFields.hook";
import { SupplyProduct } from "@utils/typings/types/supplier/supplier.types";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { Body1Typography, H6Typography } from "@components/Typography";

const Accordion = styled(MuiAccordion)<{ $isError: boolean }>`
    border: ${({ theme, $isError }) => $isError && `${theme.palette.error.main} 1px solid`};

    &.Mui-expanded {
        margin: 0;
    }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    gap: 8px;
`;

const StyledTextField = styled(TextField)`
    flex: 1;
    max-width: max-content;
    min-width: 164px;
`;

const TextFieldsContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

const ButtonsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const DynamicFieldsContainer = styled(Box)`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
`;

type ProductAccordionFormProps = {
    values: SupplyProduct;
    formikHook: FormikValues;
    index: number;
};

const ProductAccordionForm: FC<ProductAccordionFormProps> = ({ values, index, formikHook }) => {
    const { t } = useTranslation();
    const { dynamicTextFields, addButton } = useDynamicFields(formikHook, `products.${index}.properties`);

    const handleDelete = () => {
        formikHook.setFieldValue("products", formikHook.values.products.toSpliced(index, 1));
    };

    const textFields = Object.keys(omit(values, "properties")).map((field) => (
        <StyledTextField
            key={field}
            {...getTextFieldProps({
                t,
                formikHook,
                field,
                pathToValue: `products.${index}.${field}`
            })}
        />
    ));

    const isError = !!formikHook.errors?.products?.[index] && !!formikHook.touched?.products?.[index];

    return (
        <Accordion $isError={isError} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Body1Typography>{values.name}</Body1Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TextFieldsContainer>{textFields}</TextFieldsContainer>

                <DynamicFieldsContainer>
                    {!!dynamicTextFields.length && <H6Typography>{t("general.additionalParameters")}</H6Typography>}
                    {dynamicTextFields}
                </DynamicFieldsContainer>

                <ButtonsContainer>
                    {addButton}
                    <Button onClick={handleDelete}>{t("general.delete")}</Button>
                </ButtonsContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default ProductAccordionForm;
