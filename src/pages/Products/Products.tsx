import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import styled from "styled-components/macro";

import { Pagination as MuiPagination } from "@mui/material";

import ProductCard from "@pages/Products/components/ProductCard";
import ProductsPerPageSelect from "@pages/Products/components/ProductsPerPageSelect";

import { productsApi } from "@store/apis/products.api";

import { usePagination } from "@utils/hooks/usePagination.hook";
import { CardsContainerStyled } from "@utils/styles/Cards.styled";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import NoDataMessage from "@components/NoDataMessage";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import CreateProductModal from "../../App/Modals/CreateProductModal/CreateProductModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";

const ROWS_PER_PAGE_OPTIONS: number[] = [5, 25, 50];

const Pagination = styled(MuiPagination)`
    margin: 0 auto;
    padding: 4px;
`;

const Products = () => {
    const modalHook = useModal();
    const { shelfId = "" } = useParams();
    const { t } = useTranslation();
    const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = usePagination({ rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS });
    const { data, isFetching, isError } = productsApi.useGetProductsQuery({ shelfId: +shelfId, page, limit: rowsPerPage }, { skip: !shelfId });

    const leftPartToolBar = (
        <ProductsPerPageSelect rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS} rowsPerPage={rowsPerPage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
    );

    const rightPartToolBar = (
        <>
            <BackButton />
            <Button size="small" onClick={modalHook.openModal}>
                {t("general.addProduct")}
            </Button>
        </>
    );

    if (!data?.products?.length) {
        return (
            <>
                <ToolBar leftPart={leftPartToolBar} rightPart={rightPartToolBar} />
                <NoDataMessage />;
                <CreateProductModal modalHook={modalHook} shelfId={+shelfId} />
            </>
        );
    }

    const products = data.products.map((product) => <ProductCard key={product.id} {...product} />);

    return (
        <>
            <ToolBar leftPart={leftPartToolBar} rightPart={rightPartToolBar} />
            {isFetching ? <SelfCenterLoader isLoading={isFetching} isError={isError} /> : <CardsContainerStyled>{products}</CardsContainerStyled>}
            <Pagination count={data.totalPages} onChange={handleChangePage} />
            <CreateProductModal modalHook={modalHook} shelfId={+shelfId} />
        </>
    );
};

export default Products;
