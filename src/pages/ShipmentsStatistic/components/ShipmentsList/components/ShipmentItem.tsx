import React, { FC } from "react";
import { Accordion, AccordionDetails as MuiAccordionDetails, AccordionSummary, Box, Paper } from "@mui/material";
import { GetShipmentResponseItem } from "@utils/typings/types/shipments/shipments.types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Body1Typography, H5Typography, H6Typography } from "@components/Typography";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { format } from "date-fns";
import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import InfoIcon from "@mui/icons-material/Info";
import { useModal } from "../../../../../App/Modals/Modal/useModal.hook";
import ShippedProductsModal from "../../../../../App/Modals/ShippedProductsModal/ShippedProductsModal";

const AccordionDetails = styled(MuiAccordionDetails)`
    border: ${({ theme }) => `${theme.palette.divider} 1px solid`};
    border-top: none;
`;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: start;`;

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 0 0 0;
`;

const InfoRow = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding: 16px 0 0 0;
    gap: 4px;`;

const ShipmentItem: FC<GetShipmentResponseItem> = (shipment) => {
    const { t } = useTranslation();
    const { id, name, surname, patronymic, email, phoneNumber, address, createdAt, products } = shipment;
    const { totalPrice, totalAmount } = calculateTotalShippedProducts(shipment);
    const uniqueUnits = getUniqueShippedProductsCount(shipment);
    const modalHook = useModal()

    return (
        <Accordion>
            <AccordionSummary elevation={3} component={Paper} expandIcon={<ExpandMoreIcon />}>
                <H6Typography fontWeight="bold">{t("general.shipment")}: {id}</H6Typography>
            </AccordionSummary>

            <AccordionDetails>

                <Container>
                    <Wrapper>
                        <H5Typography fontWeight="bolder">{t("general.customerInfo")}</H5Typography>

                        <Body1Typography>
                           {t("general.name")}: {name}
                        </Body1Typography>

                        <Body1Typography>
                           {t("general.surname")}: {surname}
                        </Body1Typography>

                        <Body1Typography>
                           {t("general.patronymic")}: {patronymic}
                        </Body1Typography>

                        <Body1Typography>
                            {t("general.email")}: {email}
                        </Body1Typography>

                        <Body1Typography>
                            {t("general.phoneNumber")}: {phoneNumber}
                        </Body1Typography>

                        <Body1Typography>
                           {t("general.address")}: {address}
                        </Body1Typography>

                        <Body1Typography>
                            {t("general.createdAt")}: {format(new Date(createdAt), DATE_TIME_FORMAT.shortDate)}
                        </Body1Typography>
                    </Wrapper>

                    <Wrapper>
                        <H5Typography fontWeight="bolder">{t("general.shipmentsInfo")}</H5Typography>

                        <Body1Typography>
                            {t("general.shippedUnitsAmount")}: {uniqueUnits}
                        </Body1Typography>

                        <Body1Typography>
                          {t("general.totalShippedProducts")}: {totalAmount}
                        </Body1Typography>

                        <Body1Typography>
                           {t("general.totalPriceOfShippedProducts")}: {totalPrice} {t("currencies.uah")}
                        </Body1Typography>

                        <InfoRow onClick={modalHook.openModal}>
                            <H5Typography fontWeight="bolder">{t("general.productsList")}</H5Typography>

                            <InfoIcon color="primary" />
                        </InfoRow>

                        <ShippedProductsModal modalHook={modalHook} products={products}/>
                    </Wrapper>
                </Container>
            </AccordionDetails>
        </Accordion>
    );
};

export default ShipmentItem;

function calculateTotalShippedProducts(shipment: GetShipmentResponseItem) {
    let totalPrice = 0;
    let totalAmount = 0;

    shipment.products.forEach((product) => {
        if (product.ShipmentProducts) {
            const productTotalPrice = product.pricePerUnit * product.ShipmentProducts.amount;
            totalPrice += productTotalPrice;
            totalAmount += product.ShipmentProducts.amount;
        }
    });
    return { totalPrice, totalAmount };
};

function getUniqueShippedProductsCount(shipment: GetShipmentResponseItem) {
    const uniqueProductIds = new Set();

    shipment.products.forEach((product) => {
        if (product.ShipmentProducts) {
            uniqueProductIds.add(product.id);
        }
    });

    return uniqueProductIds.size;
};
