import styled from "styled-components";

import React, { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { getValueWithCurrency } from "@utils/helpers/getValueWithUnits.helpers";
import { Product } from "@utils/typings/types/products/products.types";

const Container = styled(Box)`
    min-height: 400px;
`;

type ChartData = {
    month: string;
    totalCost: number;
    totalAmount: number;
};

type SupplyChartProps = {
    products?: Product[];
};

const SupplyChart: FC<SupplyChartProps> = ({ products }) => {
    const { t } = useTranslation();

    const priceFormatter = useCallback((value: number) => getValueWithCurrency(value, t), [t]);

    const dataSet = useMemo(() => groupByMonth(products ?? []), [products]);

    const series = useMemo(
        () => [
            { dataKey: "totalCost", label: t("general.totalPrice"), valueFormatter: priceFormatter },
            { dataKey: "totalAmount", label: t("general.amount") }
        ],
        []
    );

    const xAxis = useMemo(() => [{ scaleType: "band" as const, dataKey: "month" }], []);

    if (!products?.length) {
        return null;
    }

    return (
        <Container>
            <BarChart dataset={dataSet} series={series} xAxis={xAxis} margin={{ top: 64 }} />
        </Container>
    );
};

export default SupplyChart;

function groupByMonth(products: Product[]): ChartData[] {
    const result = products.reduce((acc: Record<string, ChartData>, item) => {
        const date = new Date(item.createdAt);
        const month = format(date, DATE_TIME_FORMAT.monthYear);
        if (!acc[month]) {
            acc[month] = { month: month, totalAmount: 0, totalCost: 0 };
        }
        acc[month].totalAmount += item.initialAmount;
        acc[month].totalCost += item.initialAmount * item.pricePerUnit;
        return acc;
    }, {});

    return Object.values(result);
}
