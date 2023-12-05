import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import PSTable from "@pages/ProductsSearch/components/PSTable";

import { productsApi } from "@store/apis/products.api";

import { PAGE_PATH } from "@utils/constants/common.constants";

import BackButton from "@components/BackButton";
import SearchField from "@components/SearchField";
import ToolBar from "@components/ToolBar";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 16px;
    flex: 1;
    overflow: auto;
`;

const ProductsSearch = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [queryTrigger, { data, isFetching }] = productsApi.useLazySearchProductQuery();

    const handleChange = useCallback(
        (newName: string) => {
            navigate(`${PAGE_PATH.products.search}/${newName}`);
        },
        [navigate]
    );

    return (
        <>
            <ToolBar
                leftPart={<SearchField labelTranslationKey="routes.productsSearch" onChange={handleChange} initialValue={name} queryTrigger={queryTrigger} />}
                rightPart={<BackButton path={PAGE_PATH.home} />}
            />

            <Container>
                <PSTable isFetching={isFetching} products={data} />
            </Container>
        </>
    );
};

export default ProductsSearch;
