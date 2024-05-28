import React, { Dispatch, FC, SetStateAction } from "react";
import { useModal } from "../../Modal/useModal.hook";
import { Body1Typography } from "@components/Typography";
import ProductInfoModal from "../../ProductInfoModal/ProductInfoModal";
import styled from "styled-components";
import MuiInfoIcon from "@mui/icons-material/Info";
import { Box, Paper } from "@mui/material";
import { ExtendedSearchProduct } from "@utils/typings/types/products/products.types";
import MuiDeleteIcon from "@mui/icons-material/Delete";

const InfoIcon = styled(MuiInfoIcon)`
    align-self: flex-end;
    cursor: pointer;`;

const DeleteIcon = styled(MuiDeleteIcon)`
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

type AddedProductItemProps = {
    product: ExtendedSearchProduct;
    setAddedProducts:Dispatch<SetStateAction<ExtendedSearchProduct[]>>
}

const AddedProductItem:FC<AddedProductItemProps> = ({product, setAddedProducts}) => {
    const modalHook = useModal();

    const handleDeleteProduct = ()=>{
        setAddedProducts((prev) => prev.filter(prevProduct => prevProduct.id !== product.id));
    }

    return (
        <Container elevation={3}>
            <Body1Typography>{product.name}</Body1Typography>

            <Wrapper>
                <DeleteIcon color="primary" onClick={handleDeleteProduct} />
                <InfoIcon color="primary" onClick={modalHook.openModal} />
            </Wrapper>

            <ProductInfoModal modalHook={modalHook} product={product} />
        </Container>
    );
};

export default AddedProductItem;