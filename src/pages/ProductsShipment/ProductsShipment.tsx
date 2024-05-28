import React from "react";
import ToolBar from "@components/ToolBar";
import BackButton from "@components/BackButton";
import styled from "styled-components/macro";
import { Box } from "@mui/material";
import CustomerForm from "@pages/ProductsShipment/components/CustomerForm";

import ProductsList from "@pages/ProductsShipment/components/ProductsList/ProductsList";
import { useShipmentForm } from "@pages/ProductsShipment/useShipmentForm.hook";
import Button from "@components/Button";
import { useTranslation } from "react-i18next";


const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 16px;
    padding: 16px;
    overflow: hidden;
`;

const ProductsShipment = () => {
    const { t } = useTranslation();
    const {formikHook} = useShipmentForm();

    const isDisabled = !formikHook.values.products.length

    return (
        <>
            <ToolBar rightPart={<BackButton />} />

            <Container>
                <CustomerForm formikHook={formikHook} />

                <ProductsList formikHook={formikHook} />

                <Button onClick={formikHook.handleSubmit} disabled={isDisabled}>{t("general.confirm")}</Button>
            </Container>
        </>
    );
};

export default ProductsShipment;