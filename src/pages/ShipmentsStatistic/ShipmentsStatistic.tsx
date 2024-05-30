import React from "react";

import ToolBar from "@components/ToolBar";
import DateRangePicker from "@components/DateRangePicker";
import BackButton from "@components/BackButton";
import { useDateRange } from "@utils/hooks/useDateRange.hook";
import { shipmentsApi } from "@store/apis/shipments.api";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import NoDataMessage from "@components/NoDataMessage";
import styled from "styled-components";
import { Box } from "@mui/material";
import { H4Typography } from "@components/Typography";
import { useTranslation } from "react-i18next";
import TotalStatistic from "@pages/ShipmentsStatistic/components/TotalStatistic";
import ShipmentsChart from "@pages/ShipmentsStatistic/components/ShipmentsChart";
import ShipmentsList from "@pages/ShipmentsStatistic/components/ShipmentsList/ShipmentsList";


const Container = styled(Box)`
    display: flex;
    padding: 16px;
    flex-direction: column;
    overflow: auto;
    gap: 8px;
    height: 100%;
`;

const ShipmentsStatistic = () => {
    const { t } = useTranslation();
    const { value, dateRange, handleChange } = useDateRange();
    const { data, isFetching, isError } = shipmentsApi.useGetShipmentsQuery(dateRange, { skip: !value[0] || !value[1] });

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


    return <>
        <ToolBar leftPart={<DateRangePicker value={value} onChange={handleChange} />} rightPart={<BackButton />} />

        <Container>
            <H4Typography align="center">{t("general.shipmentsInfo")}</H4Typography>

            <TotalStatistic shipments={data} />

            <ShipmentsChart shipments={data} />

            <ShipmentsList shipments={data} />
        </Container>
    </>;
};

export default ShipmentsStatistic;