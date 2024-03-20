import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { subMonths } from "date-fns";

import styled from "styled-components/macro";

import { Box } from "@mui/material";
import { DateRange } from "@mui/x-date-pickers-pro";

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

const START_DATE = subMonths(new Date(), 3);

const END_DATE = new Date();

const INITIAL_RANGE: DateRange<Date> = [START_DATE, END_DATE];

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
    const [range, setRange] = useState<DateRange<Date>>(INITIAL_RANGE);
    const dateRangeDto = useMemo(() => ({ startDate: range[0]?.toISOString() as string, endDate: range[1]?.toISOString() as string }), [range]);
    const { data, isFetching, isError } = suppliersApi.useGetStatisticsQuery(dateRangeDto, { skip: !range[0] || !range[1] });

    const handleChange = useCallback((newRange: DateRange<Date>) => {
        setRange(newRange);
    }, []);

    if (isFetching || isError) {
        return (
            <>
                <ToolBar leftPart={<DateRangePicker value={range} onChange={handleChange} />} rightPart={<BackButton />} />
                <SelfCenterLoader isLoading={isFetching} isError={isError} />
            </>
        );
    }

    if (!data) {
        return (
            <>
                <ToolBar leftPart={<DateRangePicker value={range} onChange={handleChange} />} rightPart={<BackButton />} />
                <NoDataMessage />;
            </>
        );
    }

    return (
        <>
            <ToolBar leftPart={<DateRangePicker value={range} onChange={handleChange} />} rightPart={<BackButton />} />

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
