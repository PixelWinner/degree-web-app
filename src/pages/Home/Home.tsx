import React from "react";

import styled from "styled-components/macro";

import ArchiveIcon from "@mui/icons-material/Archive";
import ProductsTableIcon from "@mui/icons-material/Article";
import SupplyStatisticsIcon from "@mui/icons-material/InsertChart";
import SupplyIcon from "@mui/icons-material/NoteAdd";
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/WarehouseOutlined";
import ShipmentIcon from "@mui/icons-material/LocalShipping";
import AddShipmentIcon from "@mui/icons-material/PostAdd";
import { Box } from "@mui/material";

import PageLink from "@pages/Home/components/PageLink";

import { PAGE_PATH } from "@utils/constants/common.constants";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px;
    gap: 8px;

    @media (max-width: 480px) {
        align-items: center;
    }
`;

const Home = () => {
    return (
        <Container>
            <PageLink titleTranslationKey="routes.storages" href={PAGE_PATH.storages} icon={<StorageIcon />} />
            <PageLink titleTranslationKey="routes.productsSearch" href={PAGE_PATH.products.search} icon={<SearchIcon />} />
            <PageLink titleTranslationKey="routes.productsTable" href={PAGE_PATH.products.table} icon={<ProductsTableIcon />} />
            <PageLink titleTranslationKey="routes.productsSupply" href={PAGE_PATH.products.supply} icon={<SupplyIcon />} />
            <PageLink titleTranslationKey="routes.supplyStatistics" href={PAGE_PATH.supplyStatistics} icon={<SupplyStatisticsIcon />} />
            <PageLink titleTranslationKey="routes.productsShipment" href={PAGE_PATH.productsShipment} icon={<AddShipmentIcon />} />
            <PageLink titleTranslationKey="routes.shipmentsStatistic" href={PAGE_PATH.shipmentsStatistic} icon={<ShipmentIcon />} />
            <PageLink titleTranslationKey="routes.archive" href={PAGE_PATH.archive} icon={<ArchiveIcon />} />
        </Container>
    );
};

export default Home;
