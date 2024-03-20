import styled from "styled-components";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";

import { calculateVolume } from "@utils/helpers/calculateVolume.helper";
import { getValueWithCurrency, getValueWithVolumeUnit, getValueWithWeightUnit } from "@utils/helpers/getValueWithUnits.helpers";
import { Product } from "@utils/typings/types/products/products.types";

import { Body1Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
`;

const DetailsRow = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

type TotalStatisticsProps = {
    products?: Product[];
};

const TotalStatistics: FC<TotalStatisticsProps> = ({ products }) => {
    const { t } = useTranslation();

    if (!products) {
        return null;
    }

    const totalAmount = products.reduce((sum, product) => sum + product.initialAmount, 0);

    const totalUnitAmount = products.length;

    const totalVolume = products.reduce(
        (sum, { width, length, height, initialAmount }) =>
            sum +
            calculateVolume({
                width,
                length,
                height,
                amount: initialAmount
            }),
        0
    );

    const totalWeight = products.reduce((sum, product) => sum + product.weightPerUnit * product.initialAmount, 0);

    const totalPrice = products.reduce((sum, product) => sum + product.pricePerUnit * product.initialAmount, 0);

    const suppliersCount = new Set(products.map((product) => product.supplierId)).size;

    return (
        <Container>
            <DetailsRow>
                <Body1Typography fontWeight="bolder">{t("general.numberOfProducts")}:</Body1Typography>

                <Body1Typography>{totalAmount}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder"> {t("general.amountUnitsProducts")}:</Body1Typography>

                <Body1Typography>{totalUnitAmount}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder"> {t("general.totalVolume")}:</Body1Typography>

                <Body1Typography>{getValueWithVolumeUnit(totalVolume, t)}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder"> {t("general.totalWeight")}:</Body1Typography>

                <Body1Typography>{getValueWithWeightUnit(totalWeight, t)}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder"> {t("general.totalPrice")}:</Body1Typography>

                <Body1Typography>{getValueWithCurrency(totalPrice, t)}</Body1Typography>
            </DetailsRow>

            <DetailsRow>
                <Body1Typography fontWeight="bolder"> {t("general.suppliersCount")}:</Body1Typography>

                <Body1Typography>{suppliersCount}</Body1Typography>
            </DetailsRow>
        </Container>
    );
};

export default TotalStatistics;
