import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import styled from "styled-components/macro";

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

import { productsApi } from "@store/apis/products.api";

import { getValueWithCurrency } from "@utils/helpers/getValueWithUnits.helpers";
import { usePagination } from "@utils/hooks/usePagination.hook";
import { useSortedTableData } from "@utils/hooks/useSortedTableData.hook";
import { ThemeMode } from "@utils/typings/enums/common.enums";
import { Product } from "@utils/typings/types/products/products.types";

import { SelfCenterLoader } from "@components/SelfCenterLoader";
import TablePagination from "@components/TablePagination/TablePagination";
import { H6Typography } from "@components/Typography";

const TableContainer = styled(MuiTableContainer)`
    min-height: 160px;
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
`;

const COLUMNS: Column[] = [
    { key: "name", titleTranslationKey: "general.name" },
    { key: "amount", titleTranslationKey: "general.amount" },
    { key: "pricePerUnit", titleTranslationKey: "general.pricePerUnit" },
    { key: "totalPrice", titleTranslationKey: "general.totalPrice" }
];

const ROWS_PER_PAGE_OPTIONS: number[] = [5, 10, 25];

type Column = { key: keyof ExtendedProduct; titleTranslationKey: string };

type ExtendedProduct = { totalPrice: number } & Product;

const PTable = () => {
    const { shelfId = "" } = useParams();
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination({ rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS });
    const { data, isFetching, isError } = productsApi.useGetProductsQuery({ shelfId: +shelfId, page, limit: rowsPerPage }, { skip: !shelfId });
    const { t } = useTranslation();

    const extendedData: ExtendedProduct[] = useMemo(
        () =>
            (data?.products ?? [])?.map((product) => ({
                ...product,
                totalPrice: product.pricePerUnit * product.amount
            })),
        [data]
    );

    const { handleSort, sortedData, sortConfig } = useSortedTableData<ExtendedProduct>(extendedData);

    if (!shelfId) {
        return null;
    }

    if (isFetching || isError) {
        return <SelfCenterLoader isLoading={isFetching} isError={isError} />;
    }

    if (!data?.products?.length || !data.totalProducts) {
        return <H6Typography>{t("general.noData")}</H6Typography>;
    }

    const tableHead = COLUMNS?.map((column, index) => (
        <TableCell
            key={column.key}
            sortDirection={sortConfig.key === column.key ? sortConfig.direction : false}
            align={index === COLUMNS.length - 1 ? "right" : undefined}
        >
            <TableSortLabel
                active={sortConfig.key === column.key}
                direction={sortConfig.key === column.key ? sortConfig.direction : "asc"}
                onClick={() => handleSort(column.key)}
            >
                {t(column.titleTranslationKey)}
            </TableSortLabel>
        </TableCell>
    ));

    const rows = sortedData.map(({ id, name, amount, pricePerUnit }) => (
        <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{getValueWithCurrency(pricePerUnit, t)}</TableCell>
            <TableCell align="right">{getValueWithCurrency(pricePerUnit * amount, t)}</TableCell>
        </TableRow>
    ));

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>{tableHead}</TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
                <TableFooter sx={{ position: "sticky", bottom: 0 }}>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                            page={page}
                            rowsCount={data.totalProducts}
                            columnsCount={COLUMNS.length}
                            rowsPerPage={rowsPerPage}
                            handleChangePage={(_, newPage) => handleChangePage(_, newPage + 1)}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default PTable;
