import styled from "styled-components";

import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Pagination as MuiPagination } from "@mui/material";

import ArchiveProductCard from "@pages/Archive/components/ArchiveProductCard";

import { productsApi } from "@store/apis/products.api";

import { PAGE_PATH, ITEMS_PER_PAGE_OPTIONS } from "@utils/constants/common.constants";
import { usePagination } from "@utils/hooks/usePagination.hook";
import { Request } from "@utils/typings/enums/common.enums";

import BackButton from "@components/BackButton";
import NoDataMessage from "@components/NoDataMessage";
import SearchField from "@components/SearchField";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";
import ItemsPerPageSelect from "@components/ItemsPerPageSelect";

const Pagination = styled(MuiPagination)`
    margin: 0 auto;
    padding: 4px;
`;

const LeftContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`;

const CardsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    overflow: auto;
    margin-bottom: auto;
    padding: 8px;
    gap: 8px;
`;

const Archive = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const { itemsPerPage, page, handleChangePage, handleChangeItemsPerPage } = usePagination({ itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS });
    const { data, isFetching, isError, refetch } = productsApi.useGetArchivedProductsQuery({ page, limit: itemsPerPage, name });

    const handleChange = useCallback(
        (newName: string) => {
            navigate(`${PAGE_PATH.archive}/${newName}`);
        },
        [navigate]
    );

    const leftPart = useMemo(
        () => (
            <LeftContainer>
                <SearchField
                    labelTranslationKey={"routes.productsSearch"}
                    requestType={Request.QUERY}
                    refetch={refetch}
                    onChange={handleChange}
                    initialValue={name}
                />
                <ItemsPerPageSelect titleTranslationKey="general.productsPerPage" itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS} itemsPerPage={itemsPerPage} handleChangeItemsPerPage={handleChangeItemsPerPage} />
            </LeftContainer>
        ),
        [itemsPerPage]
    );

    const rightPart = <BackButton />;

    const products = data?.products.map((product) => <ArchiveProductCard key={product.id} {...product} />);

    if (!data?.products?.length && !isFetching) {
        return (
            <>
                <ToolBar leftPart={leftPart} rightPart={rightPart} />
                <NoDataMessage />;
            </>
        );
    }

    return (
        <>
            <ToolBar leftPart={leftPart} rightPart={rightPart} />
            {isFetching ? <SelfCenterLoader isLoading={isFetching} isError={isError} /> : <CardsContainer>{products}</CardsContainer>}
            <Pagination count={data?.totalPages} onChange={handleChangePage} />
        </>
    );
};

export default Archive;
