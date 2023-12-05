import styled from "styled-components";

import React from "react";

import { Box } from "@mui/material";

import ProductsForms from "@pages/ProductsSupply/ProductForms/ProductsForms";
import { useProductsForms } from "@pages/ProductsSupply/ProductForms/useProductsForms.hook";
import SupplierInfo from "@pages/ProductsSupply/SupplierInfo/SupplierInfo";
import { useSupplierInfo } from "@pages/ProductsSupply/SupplierInfo/useSupplierInfo.hook";

import { storagesApi } from "@store/apis/storages.api";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { CreateSupplyDto } from "@utils/typings/types/products/products.types";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
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
    const { data, isLoading, isError } = storagesApi.useGetStorageShelfListQuery();
    const { textFields, validate: validateInfo, supplierInfo } = useSupplierInfo();
    const { accordions, handleAddProduct, validate: validateProducts, products } = useProductsForms({ storageShelfList: data });

    const handleSubmit = async () => {
        if (!validateInfo && !validateProducts) {
            return;
        }

        const validateResult = await Promise.all([validateInfo(), validateProducts()]);
        const hasErrors = validateResult.some((obj) => !!Object.keys(obj).length);

        if (hasErrors) {
            console.error(validateResult);
            return;
        }

        const supply: CreateSupplyDto = {
            ...supplierInfo,
            products
        };

        console.log(supply);
    };

    if (isLoading || isError) {
        return (
            <>
                <ToolBar rightPart={<BackButton path={PAGE_PATH.home} />} />
                <SelfCenterLoader isLoading={isLoading} isError={isError} />
            </>
        );
    }
    //TODO if no shelves message

    return (
        <>
            <ToolBar rightPart={<BackButton path={PAGE_PATH.home} />} />

            <Container>
                <SupplierInfo textFields={textFields} />

                <ProductsForms accordions={accordions} handleAddProduct={handleAddProduct} />

                <Button onClick={handleSubmit}>Submit</Button>
            </Container>
        </>
    );
};

export default ProductsSupply;
