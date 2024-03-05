import React, { FC, useCallback, useMemo, useState } from "react";

import { ExtendedSearchProduct } from "@utils/typings/types/products/products.types";

import ExtendedTable, { RowsProps, TableColumn } from "@components/ExtendedTable/ExtendedTable";
import NoDataMessage from "@components/NoDataMessage";
import { SelfCenterLoader } from "@components/SelfCenterLoader";

import { useModal } from "../../../App/Modals/Modal/useModal.hook";
import ProductInfoModal from "../../../App/Modals/ProductInfoModal/ProductInfoModal";

const COLUMNS: TableColumn<ExtendedProduct>[] = [
    {
        key: "name",
        titleTranslationKey: "general.name"
    },
    {
        key: "amount",
        titleTranslationKey: "general.amount"
    },
    {
        key: "pricePerUnit",
        titleTranslationKey: "general.pricePerUnit",
        unitsTranslationKey: "currencies.uah"
    },
    {
        key: "totalPrice",
        titleTranslationKey: "general.totalPrice",
        unitsTranslationKey: "currencies.uah"
    },
    {
        key: "storageName",
        titleTranslationKey: "general.storageName"
    },
    {
        key: "shelfName",
        titleTranslationKey: "general.shelfName"
    }
];

type ExtendedProduct = ExtendedSearchProduct & { totalPrice: number };

type PsTableProps = {
    isFetching: boolean;
    products: ExtendedSearchProduct[] | undefined;
};

const PsTable: FC<PsTableProps> = ({ isFetching, products }) => {
    const [modalProduct, setModalProduct] = useState<ExtendedSearchProduct | null>(null);

    const handleClick: RowsProps<ExtendedSearchProduct>["onClick"] = useCallback((item: ExtendedSearchProduct) => {
        setModalProduct(item);

        modalHook.openModal();
    }, []);

    const onClose = useCallback(() => {
        setModalProduct(null);
    }, []);

    const modalHook = useModal({ onClose });

    const extendedRows: ExtendedProduct[] = useMemo(
        () =>
            (products ?? [])?.map((product) => ({
                ...product,
                totalPrice: product.pricePerUnit * product.amount
            })),
        [products]
    );

    const rowsProps: RowsProps<ExtendedSearchProduct> = useMemo(
        () => ({
            sx: { cursor: "pointer" },
            onClick: handleClick
        }),
        [handleClick]
    );

    if (isFetching) {
        return <SelfCenterLoader isLoading={isFetching} />;
    }

    if (!products?.length) {
        return <NoDataMessage />;
    }

    if (!products) {
        return null;
    }

    return (
        <>
            <ExtendedTable columns={COLUMNS} rows={extendedRows} rowsProps={rowsProps} />
            {modalProduct && <ProductInfoModal modalHook={modalHook} product={modalProduct} />}
        </>
    );
};

export default PsTable;
