import React, { FC } from "react";
import { ModalHookReturns } from "../modal.types";
import { GetShipmentResponseItem } from "@utils/typings/types/shipments/shipments.types";
import { Modal } from "../Modal/Modal";
import { H5Typography } from "@components/Typography";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Box } from "@mui/material";
import ProductItem from "./components/ProductItem";
import MuiCloseIcon from "@mui/icons-material/Close";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 8px;
    min-width: 300px;
    width: 100%;
    height: 400px;
    overflow-y: auto;
    padding: 8px;
    border: ${({ theme }) => `${theme.palette.divider} 1px solid`};
    border-radius: 4px;
`;

const CloseIcon = styled(MuiCloseIcon)`
    align-self: flex-end;
    cursor: pointer;
`;

type ShippedProductsModalProps = {
    modalHook: ModalHookReturns
    products: GetShipmentResponseItem["products"]
}

const ShippedProductsModal: FC<ShippedProductsModalProps> = ({ modalHook, products }) => {
    const { t } = useTranslation();

    const productsList = products.map((product)=> <ProductItem key={product.id} {...product} />)

    return (
        <Modal  {...modalHook.modalProps}>
            <CloseIcon onClick={modalHook.closeModal} />

            <H5Typography>{t("general.productsList")}</H5Typography>

            <Container>
                {productsList}
            </Container>
        </Modal>
    );
};

export default ShippedProductsModal;