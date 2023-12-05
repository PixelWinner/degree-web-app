import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import Button from "@components/Button";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 8px;
`;

type ProductsFormsProps = {
    accordions: JSX.Element[];
    handleAddProduct: () => void;
};

const ProductsForms: FC<ProductsFormsProps> = ({ accordions, handleAddProduct }) => {
    const { t } = useTranslation();

    return (
        <Container>
            {accordions}
            <Button onClick={handleAddProduct}>{t("general.addProduct")}</Button>
        </Container>
    );
};

export default ProductsForms;
