import React from "react";

import styled from "styled-components/macro";

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
`;

const Home = () => {
    return (
        <Container>
            <PageLink titleTranslationKey="general.storages" href={PAGE_PATH.storages} icon={<StorageIcon />} />
        </Container>
    );
};

export default Home;
