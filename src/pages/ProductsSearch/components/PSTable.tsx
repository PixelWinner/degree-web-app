import React, { FC, useMemo } from "react";

import { ExtendedSearchProduct } from "@utils/typings/types/products/products.types";

import ExtendedTable, { TableColumn } from "@components/ExtendedTable";
import NoDataMessage from "@components/NoDataMessage";
import { SelfCenterLoader } from "@components/SelfCenterLoader";

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
    const extendedRows: ExtendedProduct[] = useMemo(
        () =>
            (products ?? [])?.map((product) => ({
                ...product,
                totalPrice: product.pricePerUnit * product.amount
            })),
        [products]
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

    return <ExtendedTable columns={COLUMNS} rows={extendedRows} />;
};

export default PsTable;
