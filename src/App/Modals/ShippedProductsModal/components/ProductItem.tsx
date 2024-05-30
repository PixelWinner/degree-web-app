import React, { FC } from "react";
import { Product } from "@utils/typings/types/products/products.types";
import { Body1Typography } from "@components/Typography";
import ProductInfoModal from "../../ProductInfoModal/ProductInfoModal";
import styled from "styled-components";
import MuiInfoIcon from "@mui/icons-material/Info";
import { Paper } from "@mui/material";
import { useModal } from "../../Modal/useModal.hook";

const InfoIcon = styled(MuiInfoIcon)`
    align-self: flex-end;
    cursor: pointer;`;


const Container = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px;
    gap: 32px`;


const ProductItem:FC<Product> = (product) => {
    const modalHook = useModal();

    return (
        <Container elevation={3}>
            <Body1Typography>{product.name}</Body1Typography>

            <InfoIcon color="primary" onClick={modalHook.openModal} />

            <ProductInfoModal modalHook={modalHook} product={product} />
        </Container>
    );
};

export default ProductItem;