import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import styled from "styled-components/macro";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { Product } from "@utils/typings/types/products/products.types";

import { Body1Typography, H6Typography } from "@components/Typography";

import { useModal } from "../../../App/Modals/Modal/useModal.hook";
import ProductInfoModal from "../../../App/Modals/ProductInfoModal/ProductInfoModal";

const RowContainer = styled(Paper)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 8px;
    margin-bottom: 8px;
`;

type ProductsListProps = {
    products?: Product[];
};

const StyledIcon = styled(InfoIcon)`
    cursor: pointer;
`;

const ProductsList: FC<ProductsListProps> = ({ products }) => {
    const { t } = useTranslation();
    const [modalProduct, setModalProduct] = useState<Product | null>(null);

    const onClose = useCallback(() => {
        setModalProduct(null);
    }, []);

    const modalHook = useModal({ onClose });

    const productsList = products?.map((product) => {
        const handleClick = () => {
            setModalProduct(product);
            modalHook.openModal();
        };

        return (
            <RowContainer key={product.id} elevation={3}>
                <Body1Typography key={product.id}>
                    {product.name} ({format(new Date(product.createdAt), DATE_TIME_FORMAT.shortDate)})
                </Body1Typography>

                <StyledIcon color="primary" onClick={handleClick} />
            </RowContainer>
        );
    });

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <H6Typography fontWeight="bold">{t("general.productsList")}</H6Typography>
            </AccordionSummary>

            <AccordionDetails>{productsList}</AccordionDetails>
            {modalProduct && <ProductInfoModal modalHook={modalHook} product={modalProduct} />}
        </Accordion>
    );
};

export default ProductsList;
