import styled from "styled-components";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails as MuiAccordionDetails, AccordionSummary, Box, Paper } from "@mui/material";

import { Product } from "@utils/typings/types/products/products.types";

import { Body1Typography, H6Typography } from "@components/Typography";

const StyledAccordion = styled(Accordion)`
    & .MuiAccordion-region {
        max-height: 350px;
        overflow: auto;
    }
`;

const DetailsRow = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const DetailsContainer = styled(Paper)`
    padding: 4px 8px;
`;

const AccordionDetails = styled(MuiAccordionDetails)`
    display: flex;
    flex-direction: column;
    gap: 8px;`

type SuppliersListProps = {
    products?: Product[];
};

const SuppliersList: FC<SuppliersListProps> = ({ products }) => {
    const { t } = useTranslation();

    const uniqueSuppliers = products?.filter((product, index, array) => {
        return array.findIndex((p) => p.supplierId === product.supplierId) === index;
    });

    const suppliers = uniqueSuppliers?.map(({ supplier, supplierId }) => (
        <DetailsContainer key={supplierId} elevation={3}>
            <DetailsRow>
                <Body1Typography fontWeight="bolder">{t("general.fullCompanyName")}:</Body1Typography>
                <Body1Typography>{supplier.fullCompanyName}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder">{t("general.legalAddress")}:</Body1Typography>
                <Body1Typography>{supplier.legalAddress}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder">{t("general.TIN")}:</Body1Typography>
                <Body1Typography>{supplier.TIN}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder">{t("general.USREOU")}:</Body1Typography>
                <Body1Typography>{supplier.USREOU}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder">{t("general.email")}:</Body1Typography>
                <Body1Typography>{supplier.email}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder">{t("general.phoneNumber")}:</Body1Typography>
                <Body1Typography>{supplier.phoneNumber}</Body1Typography>
            </DetailsRow>
        </DetailsContainer>
    ));

    if (!suppliers) {
        return null;
    }

    return (
        <StyledAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <H6Typography fontWeight="bold">{t("general.suppliersList")}</H6Typography>
            </AccordionSummary>

            <AccordionDetails>{suppliers}</AccordionDetails>
        </StyledAccordion>
    );
};

export default SuppliersList;
