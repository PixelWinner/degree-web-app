import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";

import ArchiveRecordsList from "@pages/Archive/components/ArchiveRecordsList";

import { productsApi } from "@store/apis/products.api";

import { Product } from "@utils/typings/types/products/products.types";

import { Body1Typography } from "@components/Typography";

import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    border: ${({ theme }) => theme.palette.divider} 2px solid;
    border-radius: 4px;
`;

const Icon = styled(DeleteIcon)`
    cursor: pointer;
`;

const TitleContainer = styled(Box)`
    display: flex;
    justify-content: space-between;
`;

const ArchiveProductCard: FC<Product> = (product) => {
    const { t } = useTranslation();
    const [deleteProduct] = productsApi.useDeleteProductMutation();

    const modalHook = useModal();

    const handleDeleteProduct = async () => {
        return await deleteProduct({ id: product.id, shelfId: product.shelfId }).unwrap();
    };


    const hasAmount = !!product.amount;
    const hasShipments = !!product.shipments.length;

    const isDisabled = hasAmount || hasShipments;

    const records = product.archiveRecords?.map((record) => <ArchiveRecordsList key={record.date} productId={product.id} record={record} />);

    const tooltipTitle = (()=>{
        if(!isDisabled){
            return
        }

        if(hasShipments){
            return t("general.productCannotBeDeleted", {shipmentsAmount: product.shipments.length})
        }

        if(hasAmount){
            return t("general.productIsAvailable")
        }
    })()

    return (
        <Container>
            <TitleContainer>
                <Body1Typography>{product.name}</Body1Typography>

                <Tooltip arrow placement="top" title={tooltipTitle}>
                    <span>
                        <IconButton disabled={isDisabled} color="primary" onClick={modalHook.openModal}>
                            <Icon />
                        </IconButton>
                    </span>
                </Tooltip>
            </TitleContainer>

            {records}

            <ConfirmModal
                modalHook={modalHook}
                titleTranslationKey={"modal.deleteProduct.title"}
                titleTranslationValues={{ name: product.name }}
                onConfirm={handleDeleteProduct}
            />
        </Container>
    );
};

export default ArchiveProductCard;
