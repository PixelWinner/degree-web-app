import styled from "styled-components";

import React from "react";
import { useTranslation } from "react-i18next";

import isNumber from "lodash/isNumber";
import isString from "lodash/isString";

import {
    TableContainer as MuiTableContainer,
    TableFooter as MuiTableFooter,
    TableHead as MuiTableHead,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableSortLabel
} from "@mui/material";

import { UsePaginationReturns } from "@utils/hooks/usePagination.hook";
import { useSortedTableData } from "@utils/hooks/useSortedTableData.hook";
import { ThemeMode } from "@utils/typings/enums/common.enums";

import TablePagination from "@components/TablePagination/TablePagination";

const TableContainer = styled(MuiTableContainer)`
    overflow: auto;
    border-radius: 6px;
    border: ${({ theme }) => `${theme.palette.grey[700]} 1px solid`};
`;

const TableHead = styled(MuiTableHead)`
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => (theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[900] : theme.palette.grey[200])};
`;

const TableFooter = styled(MuiTableFooter)`
    position: sticky;
    bottom: 0;
    background-color: ${({ theme }) => (theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[900] : theme.palette.grey[200])};

    & .MuiTableCell-root {
        border-bottom: none;
    }
`;

export type TableColumn<T> = { key: keyof T; titleTranslationKey: string; unitsTranslationKey?: string };

type PaginationProps = {
    rowsCount: number;
    rowsPerPageOptions: number[];
    page: number;
} & UsePaginationReturns;

type ExtendedTableProps<T> = {
    columns: TableColumn<T>[];
    rows: T[];
    paginationProps?: PaginationProps;
};

const ExtendedTable = <T extends object>({ columns, rows, paginationProps }: ExtendedTableProps<T>) => {
    const { t } = useTranslation();
    const { handleSort, sortedData, sortConfig } = useSortedTableData<T>(rows);

    const tableHead = columns?.map((column, index) => (
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
    ));

    const columnKeys = Object.values(columns);

    const tableRows = sortedData.map((item) => (
        <TableRow key={JSON.stringify(item)}>
            {columnKeys.map((column, index) => {
                const value = item[column.key];

                if (value && (isString(value) || isNumber(value))) {
                    return (
                        <TableCell key={String(column.key)} align={index === columnKeys.length - 1 ? "right" : undefined}>
                            {value}
                        </TableCell>
                    );
                }
            })}
        </TableRow>
    ));

    const tableFooter = paginationProps ? (
        <TableFooter sx={{ position: "sticky", bottom: 0 }}>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={paginationProps.rowsPerPageOptions}
                    page={paginationProps.page}
                    rowsCount={paginationProps.rowsCount}
                    columnsCount={columns.length}
                    rowsPerPage={paginationProps.rowsPerPage}
                    handleChangePage={(_, newPage) => paginationProps.handleChangePage(_, newPage + 1)}
                    handleChangeRowsPerPage={paginationProps.handleChangeRowsPerPage}
                />
            </TableRow>
        </TableFooter>
    ) : null;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>{tableHead}</TableRow>
                </TableHead>
                <TableBody>{tableRows}</TableBody>
                {tableFooter}
            </Table>
        </TableContainer>
    );
};

export default ExtendedTable;
