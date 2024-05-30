import React, { FC } from "react";
import { GetShipmentsResponse } from "@utils/typings/types/shipments/shipments.types";
import { Body1Typography } from "@components/Typography";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

type TotalStatisticProps = {
    shipments: GetShipmentsResponse
}

const TotalStatistic: FC<TotalStatisticProps> = ({ shipments }) => {
    const { t } = useTranslation();
    const { totalAmount, totalPrice } = calculateTotalShippedProducts(shipments);
    const uniqueUnits = getUniqueShippedProductsCount(shipments);

    return (
        <Box>
            <Body1Typography>
                <strong>{t("general.shipmentsAmount")}: </strong>{shipments.length}
            </Body1Typography>

            <Body1Typography>
                <strong>{t("general.shippedUnitsAmount")}: </strong>{uniqueUnits}
            </Body1Typography>

            <Body1Typography>
                <strong>{t("general.totalShippedProducts")}: </strong>{totalAmount}
            </Body1Typography>

            <Body1Typography>
                <strong>{t("general.totalPriceOfShippedProducts")}: </strong> {totalPrice} {t("currencies.uah")}
            </Body1Typography>
        </Box>
    );
};

export default TotalStatistic;

function calculateTotalShippedProducts(shipments: GetShipmentsResponse) {
    let totalPrice = 0;
    let totalAmount = 0;

    shipments.forEach((shipment) => {
        shipment.products.forEach((product) => {
            if (product.ShipmentProducts) {
                const productTotalPrice = product.pricePerUnit * product.ShipmentProducts.amount;
                totalPrice += productTotalPrice;
                totalAmount += product.ShipmentProducts.amount;
            }
        });
    });

    return { totalPrice, totalAmount };
};

function getUniqueShippedProductsCount(shipments:GetShipmentsResponse)  {
    const uniqueProductIds = new Set();

    shipments.forEach((shipment) => {
        shipment.products.forEach((product) => {
            if (product.ShipmentProducts) {
                uniqueProductIds.add(product.id);
            }
        });
    });

    return uniqueProductIds.size;
};