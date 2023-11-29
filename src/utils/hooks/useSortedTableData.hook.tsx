import { useCallback, useMemo, useState } from "react";

import { TableSortLabelOwnProps } from "@mui/material/TableSortLabel/TableSortLabel";

type SortDirection = TableSortLabelOwnProps["direction"];

type SortConfig<T> = { key: keyof T | null; direction: SortDirection };

export type useSortedTableReturns<T> = { sortConfig: SortConfig<T>; sortedData: T[]; handleSort: (key: keyof T) => void };

export const useSortedTableData = <T,>(tableData: T[]): useSortedTableReturns<T> => {
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: "asc" });

    const handleSort = useCallback(
        (key: SortConfig<T>["key"]) => {
            let direction: SortDirection = "asc";
            if (sortConfig.key === key && sortConfig.direction === "asc") {
                direction = "desc";
            }
            setSortConfig({ key, direction });
        },
        [sortConfig]
    );

    const sortedData = useMemo(
        () =>
            tableData?.toSorted((a, b) => {
                if (!sortConfig.key) return 0;

                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (!aValue || !bValue) {
                    return 0;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            }),
        [tableData, sortConfig]
    );

    return {
        sortConfig,
        handleSort,
        sortedData
    };
};
