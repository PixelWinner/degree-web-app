import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import PTable from "@pages/ProductsTable/components/PTable";
import StorageShelfSelect from "@pages/ProductsTable/components/StorageShelfSelect";

import { PAGE_PATH } from "@utils/constants/common.constants";

import BackButton from "@components/BackButton";
import { H6Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    flex: 1;
`;

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
`;

const ProductsTable = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Header>
                <H6Typography>{t("general.selectStorageAndShelf")}</H6Typography>
                <BackButton path={PAGE_PATH.home} />
            </Header>

            <StorageShelfSelect />

            <PTable />
        </Container>
    );
};

export default ProductsTable;
