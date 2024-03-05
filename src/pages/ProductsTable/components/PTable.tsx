import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { productsApi } from "@store/apis/products.api";

import { usePagination } from "@utils/hooks/usePagination.hook";
import { Product } from "@utils/typings/types/products/products.types";

import ExtendedTable, { RowsProps, TableColumn } from "@components/ExtendedTable/ExtendedTable";
import NoDataMessage from "@components/NoDataMessage";
import { SelfCenterLoader } from "@components/SelfCenterLoader";

import { useModal } from "../../../App/Modals/Modal/useModal.hook";
import ProductInfoModal from "../../../App/Modals/ProductInfoModal/ProductInfoModal";

const COLUMNS: TableColumn<ExtendedProduct>[] = [
    { key: "name", titleTranslationKey: "general.name" },
    { key: "amount", titleTranslationKey: "general.amount" },
    { key: "pricePerUnit", titleTranslationKey: "general.pricePerUnit", unitsTranslationKey: "currencies.uah" },
    { key: "totalPrice", titleTranslationKey: "general.totalPrice", unitsTranslationKey: "currencies.uah" }
];

const ROWS_PER_PAGE_OPTIONS: number[] = [5, 10, 25];

type ExtendedProduct = Product & { totalPrice: number };

const PTable = () => {
    const { shelfId = "" } = useParams();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({ rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS });
    const { data, isFetching, isError } = productsApi.useGetProductsQuery({ shelfId: +shelfId, page, limit: rowsPerPage }, { skip: !shelfId });
    const [modalProduct, setModalProduct] = useState<ExtendedProduct | null>(null);

    const handleClick: RowsProps<ExtendedProduct>["onClick"] = useCallback((item: ExtendedProduct) => {
        setModalProduct(item);

        modalHook.openModal();
    }, []);

    const onClose = useCallback(() => {
        setModalProduct(null);
    }, []);

    const modalHook = useModal({ onClose });

    const extendedRows: ExtendedProduct[] = useMemo(
        () =>
            (data?.products ?? [])?.map((product) => ({
                ...product,
                totalPrice: product.pricePerUnit * product.amount
            })),
        [data]
    );

    const rowsProps: RowsProps<ExtendedProduct> = useMemo(
        () => ({
            sx: { cursor: "pointer" },
            onClick: handleClick
        }),
        [handleClick]
    );

    if (!shelfId) {
        return null;
    }

    if (isFetching || isError) {
        return <SelfCenterLoader isLoading={isFetching} isError={isError} />;
    }

    if (!data?.products?.length || !data.totalProducts) {
        return <NoDataMessage />;
    }

    return (
        <>
            <ExtendedTable
                columns={COLUMNS}
                rows={extendedRows}
                rowsProps={rowsProps}
                paginationProps={{
                    rowsCount: data.totalProducts,
                    rowsPerPage,
                    rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
                    page,
                    handleChangePage,
                    handleChangeRowsPerPage
                }}
            />
            {modalProduct && <ProductInfoModal modalHook={modalHook} product={modalProduct} />}
        </>
    );
};

export default PTable;
