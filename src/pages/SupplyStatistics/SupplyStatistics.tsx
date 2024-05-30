import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import ProductsList from "@pages/SupplyStatistics/components/ProductsList";
import SuppliersList from "@pages/SupplyStatistics/components/SuppliersList";
import SupplyChart from "@pages/SupplyStatistics/components/SupplyChart";
import TotalStatistics from "@pages/SupplyStatistics/components/TotalStatistics";

import { suppliersApi } from "@store/apis/suppliers.api";

import BackButton from "@components/BackButton";
import DateRangePicker from "@components/DateRangePicker";
import NoDataMessage from "@components/NoDataMessage";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";
import { H4Typography } from "@components/Typography";
import { useDateRange } from "@utils/hooks/useDateRange.hook";

const Container = styled(Box)`
    display: flex;
    padding: 16px;
    flex-direction: column;
    overflow: auto;
    gap: 8px;
    height: 100%;
`;

const SupplyStatistics = () => {
    const { t } = useTranslation();
    const { value, dateRange, handleChange } = useDateRange();
    const { data, isFetching, isError } = suppliersApi.useGetStatisticsQuery(dateRange, { skip: !value[0] || !value[1] });


    if (isFetching || isError) {
        return (
            <>
                <ToolBar leftPart={<DateRangePicker value={value} onChange={handleChange} />} rightPart={<BackButton />} />
                <SelfCenterLoader isLoading={isFetching} isError={isError} />
            </>
        );
    }

    if (!data) {
        return (
            <>
                <ToolBar leftPart={<DateRangePicker value={value} onChange={handleChange} />} rightPart={<BackButton />} />
                <NoDataMessage />;
            </>
        );
    }

    return (
        <>
            <ToolBar leftPart={<DateRangePicker value={value} onChange={handleChange} />} rightPart={<BackButton />} />

            <Container>
                <H4Typography align="center">{t("general.supplyInfo")}</H4Typography>

                <TotalStatistics products={data} />

                <SupplyChart products={data} />

                <ProductsList products={data} />

                <SuppliersList products={data} />
            </Container>
        </>
    );
};
export default SupplyStatistics;
