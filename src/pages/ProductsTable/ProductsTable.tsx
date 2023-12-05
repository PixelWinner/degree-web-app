import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import PTable from "@pages/ProductsTable/components/PTable";

import { PAGE_PATH } from "@utils/constants/common.constants";

import BackButton from "@components/BackButton";
import StorageShelfSelect from "@components/StorageShelfSelect";
import ToolBar from "@components/ToolBar";
import { H6Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    flex: 1;
    overflow: auto;
`;

const ProductsTable = () => {
    const { t } = useTranslation();

    return (
        <>
            <ToolBar leftPart={<H6Typography>{t("general.selectStorageAndShelf")}</H6Typography>} rightPart={<BackButton path={PAGE_PATH.home} />} />
            <Container>
                <StorageShelfSelect rootPath={PAGE_PATH.products.table} />

                <PTable />
            </Container>
        </>
    );
};

export default ProductsTable;
