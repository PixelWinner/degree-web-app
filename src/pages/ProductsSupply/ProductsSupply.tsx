import styled from "styled-components";

import React from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";

import ProductsForms from "@pages/ProductsSupply/ProductForms/ProductsForms";
import { useProductsForms } from "@pages/ProductsSupply/ProductForms/useProductsForms.hook";
import SupplierInfo from "@pages/ProductsSupply/SupplierInfo/SupplierInfo";
import { useSupplierInfo } from "@pages/ProductsSupply/SupplierInfo/useSupplierInfo.hook";

import { suppliersApi } from "@store/apis/suppliers.api";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { CreateSupplyDto } from "@utils/typings/types/supplier/supplier.types";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import ToolBar from "@components/ToolBar";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    flex: 1;
    overflow: auto;
    gap: 8px;
`;

const ProductsSupply = () => {
    const { t } = useTranslation();
    const { textFields, validate: validateInfo, supplierInfo } = useSupplierInfo();
    const { accordions, handleAddProduct, validate: validateProducts, products } = useProductsForms();
    const [createSupply, { isLoading }] = suppliersApi.useCreateSupplyMutation();

    const isDisabled = !products.length;

    const handleSubmit = async () => {
        const validateResult = await Promise.all([validateInfo(), validateProducts()]);
        const hasErrors = validateResult.some((obj) => !!Object.keys(obj).length);

        if (hasErrors) {
            return;
        }

        const supply: CreateSupplyDto = {
            ...supplierInfo,
            products
        };

        await createSupply(supply);
    };

    return (
        <>
            <ToolBar rightPart={<BackButton path={PAGE_PATH.home} />} />

            <Container>
                <SupplierInfo textFields={textFields} />

                <ProductsForms accordions={accordions} handleAddProduct={handleAddProduct} />

                <Button isLoading={isLoading} disabled={isDisabled} onClick={handleSubmit}>
                    {t("general.confirmSupply")}
                </Button>
            </Container>
        </>
    );
};

export default ProductsSupply;
