import styled from "styled-components";

import React, { useMemo } from "react";

import { TableContainer as MuiTableContainer, Table, TableBody, TableRowProps } from "@mui/material";

import { UsePaginationReturns } from "@utils/hooks/usePagination.hook";
import { useSortedTableData } from "@utils/hooks/useSortedTableData.hook";

import TableFooter from "@components/ExtendedTable/TableFooter";
import TableHead from "@components/ExtendedTable/TableHead";
import TableRows from "@components/ExtendedTable/TableRows";

const TableContainer = styled(MuiTableContainer)`
    overflow: auto;
    border-radius: 6px;
    border: ${({ theme }) => `${theme.palette.grey[700]} 1px solid`};
`;

export type TableColumn<T> = { key: keyof T; titleTranslationKey: string; unitsTranslationKey?: string };

export type RowsProps<T> = {
    onClick?: (item: T) => void;
} & Omit<TableRowProps, "onClick">;

type PaginationProps = {
    rowsCount: number;
    rowsPerPageOptions: number[];
    page: number;
} & UsePaginationReturns;

export type ExtendedTableProps<T> = {
    columns: TableColumn<T>[];
    rows: T[];
    paginationProps?: PaginationProps;
    rowsProps?: RowsProps<T>;
};

const ExtendedTable = <T extends object>({ columns, rows, paginationProps, rowsProps }: ExtendedTableProps<T>) => {
    const { handleSort, sortedData, sortConfig } = useSortedTableData<T>(rows);

    const columnKeys = useMemo(() => Object.values(columns), [columns]);

    return (
        <TableContainer>
            <Table>
                <TableHead columns={columns} handleSort={handleSort} sortConfig={sortConfig} />

                <TableBody>
                    <TableRows rows={sortedData} rowsProps={rowsProps} columnKeys={columnKeys} />
                </TableBody>

                <TableFooter columns={columns} paginationProps={paginationProps} />
            </Table>
        </TableContainer>
    );
};

export default ExtendedTable;
