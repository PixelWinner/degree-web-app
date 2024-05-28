import React, { FC } from "react";
import { ShippedProduct } from "@utils/typings/types/shipments/shipments.types";
import { Box, Divider, Paper } from "@mui/material";
import styled from "styled-components/macro";
import TextField from "@components/TextField";
import { FormikValues } from "formik";
import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { useTranslation } from "react-i18next";
import { Field } from "@utils/typings/enums/common.enums";
import MuiDeleteIcon from "@mui/icons-material/Delete";
import MuiInfoIcon from "@mui/icons-material/Info";
import ProductInfoModal from "../../../../../App/Modals/ProductInfoModal/ProductInfoModal";
import { useModal } from "../../../../../App/Modals/Modal/useModal.hook";
import { Body1Typography } from "@components/Typography";

const DeleteIcon = styled(MuiDeleteIcon)`
    cursor: pointer;
`;

const InfoIcon = styled(MuiInfoIcon)`
    cursor: pointer;
`;

const IconsContainer = styled(Box)`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Container = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
`;

const Header = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 16px;
`;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;
    flex-wrap: wrap;
`;


type ProductItemProps = {
    formikHook: FormikValues;
    product: ShippedProduct;
    index: number
}

const ProductItem: FC<ProductItemProps> = ({ product, formikHook, index }) => {
    const { t } = useTranslation();
    const modalHook = useModal();
    const pathToValue = `products[${index}].shippedAmount`;
    const remainder = formikHook.values.products[index].amount - formikHook.values.products[index].shippedAmount;

    const handleDelete = () => {
        const newProducts = [...formikHook.values.products];

        newProducts.splice(index, 1);

        formikHook.setFieldValue("products", newProducts);
    };

    return (
        <Container elevation={3}>
            <Header>
                <Body1Typography fontWeight="bolder">{product.name}</Body1Typography>

                <IconsContainer>
                    <DeleteIcon color="primary" onClick={handleDelete} />

                    <InfoIcon color="primary" onClick={modalHook.openModal} />
                </IconsContainer>
            </Header>

            <Divider />

            <Wrapper>
                <Body1Typography>
                    <strong>{t("general.remainder")}:</strong> {remainder}
                </Body1Typography>

                <TextField fullWidth {...getTextFieldProps({ formikHook, t, field: Field.AMOUNT, pathToValue })}
                           InputProps={{ inputProps: { min: 0, max: product.amount } }} />
            </Wrapper>


            <ProductInfoModal modalHook={modalHook} product={product} />
        </Container>
    );
};

export default ProductItem;