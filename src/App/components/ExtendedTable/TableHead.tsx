import styled from "styled-components";

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TableHead as MuiTableHead, TableCell, TableRow, TableSortLabel } from "@mui/material";

import { UseSortedTableReturns } from "@utils/hooks/useSortedTableData.hook";
import { ThemeMode } from "@utils/typings/enums/common.enums";

import { ExtendedTableProps } from "@components/ExtendedTable/ExtendedTable";

const StyledTableHead = styled(MuiTableHead)`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => (theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[900] : theme.palette.grey[200])};
`;

type TableHeadProps<T> = {
    columns: ExtendedTableProps<T>["columns"];
    sortConfig: UseSortedTableReturns<T>["sortConfig"];
    handleSort: UseSortedTableReturns<T>["handleSort"];
};

const TableHead = <T extends object>({ columns, sortConfig, handleSort }: TableHeadProps<T>) => {
    const { t } = useTranslation();

    const cells = useMemo(
        () =>
            columns?.map((column, index) => (
                <TableCell
                    key={String(column.key)}
                    sortDirection={sortConfig.key === column.key ? sortConfig.direction : false}
                    align={index === columns.length - 1 ? "right" : undefined}
                >
                    <TableSortLabel
                        active={sortConfig.key === column.key}
                        direction={sortConfig.key === column.key ? sortConfig.direction : "asc"}
                        onClick={() => handleSort(column.key)}
                    >
                        {t(column.titleTranslationKey)} {column.unitsTranslationKey ? `(${t(column.unitsTranslationKey)})` : null}
                    </TableSortLabel>
                </TableCell>
            )),
        [columns, sortConfig]
    );

    return (
        <StyledTableHead>
            <TableRow>{cells}</TableRow>
        </StyledTableHead>
    );
};

export default TableHead;
