import React from "react";

import styled from "styled-components/macro";

import ProductsTableIcon from "@mui/icons-material/Article";
import SupplyIcon from "@mui/icons-material/NoteAdd";
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/WarehouseOutlined";
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
            <PageLink titleTranslationKey="routes.productsSupply" href={PAGE_PATH.products.supply} icon={<SupplyIcon />} />
            <PageLink titleTranslationKey="routes.productsTable" href={PAGE_PATH.products.table} icon={<ProductsTableIcon />} />
            <PageLink titleTranslationKey="routes.productsSearch" href={PAGE_PATH.products.search} icon={<SearchIcon />} />
        </Container>
    );
};

export default Home;
