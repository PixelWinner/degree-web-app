import React, { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components/macro";
import { Box, Paper } from "@mui/material";
import { ExtendedSearchProduct } from "@utils/typings/types/products/products.types";
import MuiInfoIcon from "@mui/icons-material/Info";
import { Body1Typography } from "@components/Typography";
import MuiAddIcon from "@mui/icons-material/Add";
import { useModal } from "../../Modal/useModal.hook";
import ProductInfoModal from "../../ProductInfoModal/ProductInfoModal";

const InfoIcon = styled(MuiInfoIcon)`
    align-self: flex-end;
    cursor: pointer;`;

const AddIcon = styled(MuiAddIcon)`
    align-self: flex-end;
    cursor: pointer;`;

const Container = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px;
    gap: 32px`;

const Wrapper = styled(Box)`
    display: flex;
    gap: 8px`;

type ProductItemProps = {
    product: ExtendedSearchProduct
    setAddedProducts:Dispatch<SetStateAction<ExtendedSearchProduct[]>>
}
const ProductItem: FC<ProductItemProps> = ({ product, setAddedProducts }) => {
    const modalHook = useModal();

    const handleAddProduct = ()=>{
        setAddedProducts((prev) => [...prev, product]);
    }

    return (
        <Container elevation={3}>
            <Body1Typography>{product.name}</Body1Typography>

            <Wrapper>
                <AddIcon color="primary" onClick={handleAddProduct} />
                <InfoIcon color="primary" onClick={modalHook.openModal} />
            </Wrapper>

            <ProductInfoModal modalHook={modalHook} product={product} />
        </Container>
    );
};

export default ProductItem;