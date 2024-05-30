import React, { FC, useCallback, useMemo } from "react";
import { GetShipmentsResponse } from "@utils/typings/types/shipments/shipments.types";
import styled from "styled-components";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { getValueWithCurrency } from "@utils/helpers/getValueWithUnits.helpers";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";

const Container = styled(Box)`
    min-height: 400px;
`;

type ChartData = {
    month: string;
    totalCost: number;
    productsAmount: number;
    shipmentsAmount: number;
};


type ShipmentsChartProps = {
    shipments: GetShipmentsResponse
}

const ShipmentsChart: FC<ShipmentsChartProps> = ({ shipments }) => {
    const { t } = useTranslation();
    const priceFormatter = useCallback((value: number) => getValueWithCurrency(value, t), [t]);

    const dataSet = useMemo(() => groupByMonth(shipments ?? []), [shipments]);

    const series = useMemo(
        () => [
            { dataKey: "totalCost", label: t("general.totalPriceOfShippedProducts"), valueFormatter: priceFormatter },
            { dataKey: "productsAmount", label: t("general.totalShippedProducts") },
            { dataKey: "shipmentsAmount", label: t("general.shipmentsAmount") },
        ],
        []
    );

    const xAxis = useMemo(() => [{ scaleType: "band" as const, dataKey: "month" }], []);

    if (!shipments.length) {
        return null;
    }

    return (
        <Container>
            <BarChart dataset={dataSet} series={series} xAxis={xAxis} margin={{ top: 64 }} />
        </Container>
    );
};

export default ShipmentsChart;

function groupByMonth(shipments:GetShipmentsResponse): ChartData[] {
    const result = shipments.reduce((acc: Record<string, ChartData>, shipment) => {
        const date = new Date(shipment.createdAt);
        const month = format(date, DATE_TIME_FORMAT.monthYear);

        if (!acc[month]) {
            acc[month] = { month, productsAmount: 0, totalCost: 0, shipmentsAmount: 0 };
        }

        acc[month].shipmentsAmount += 1;

        shipment.products.forEach((product) => {
            if (product.ShipmentProducts) {
                acc[month].productsAmount += product.ShipmentProducts.amount;
                acc[month].totalCost += product.ShipmentProducts.amount * product.pricePerUnit;
            }
        });

        return acc;
    }, {});

    return Object.values(result);
}