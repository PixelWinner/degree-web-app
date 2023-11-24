import React from "react";

import styled from "styled-components/macro";

import ProductsTableIcon from "@mui/icons-material/Article";
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
            <PageLink titleTranslationKey="routes.productsTable" href={PAGE_PATH.productsTable} icon={<ProductsTableIcon />} />
        </Container>
    );
};

export default Home;
