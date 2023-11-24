import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import styled from "styled-components/macro";

import { TableContainer as MuiTableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

import { productsApi } from "@store/apis/products.api";

import { getValueWithCurrency } from "@utils/helpers/getValueWithUnits.helpers";
import { useSortedTableData } from "@utils/hooks/useSortedTableData.hook";
import { Product } from "@utils/typings/types/products/products.types";

import { SelfCenterLoader } from "@components/SelfCenterLoader";
import { H6Typography } from "@components/Typography";

const TableContainer = styled(MuiTableContainer)`
    max-height: 480px;
    overflow: auto;
    border: ${({ theme }) => `${theme.palette.grey.A700} 1px solid`};
`;

type HeadCell = { key: keyof ExtendedProduct; label: string };

type ExtendedProduct = { order: number; totalPrice: number } & Product;

const PTable = () => {
    const { shelfId = "" } = useParams();
    const { data, isFetching, isError } = productsApi.useGetProductsQuery(+shelfId, { skip: !shelfId });
    const { t } = useTranslation();

    const dataWithOrder: ExtendedProduct[] = useMemo(
        () =>
            (data ?? [])?.map((product, index) => ({
                ...product,
                order: ++index,
                totalPrice: product.pricePerUnit * product.amount
            })),
        [data]
    );

    const { handleSort, sortedData, sortConfig } = useSortedTableData<ExtendedProduct>(dataWithOrder);

    if (!shelfId) {
        return null;
    }

    if (isFetching || isError) {
        return <SelfCenterLoader isLoading={isFetching} isError={isError} />;
    }

    if (!data?.length) {
        return <H6Typography>{t("general.noData")}</H6Typography>;
    }

    const headCells: HeadCell[] = [
        { key: "order", label: "№" },
        { key: "name", label: t("general.name") },
        { key: "amount", label: t("general.amount") },
        { key: "pricePerUnit", label: t("general.pricePerUnit") },
        { key: "totalPrice", label: t("general.totalPrice") }
    ];

    const tableHead = headCells?.map((headCell, index) => (
        <TableCell
            key={headCell.key}
            sortDirection={sortConfig.key === headCell.key ? sortConfig.direction : false}
            align={index === headCells.length - 1 ? "right" : undefined}
        >
            <TableSortLabel
                active={sortConfig.key === headCell.key}
                direction={sortConfig.key === headCell.key ? sortConfig.direction : "asc"}
                onClick={() => handleSort(headCell.key)}
            >
                {headCell.label}
            </TableSortLabel>
        </TableCell>
    ));

    const rows = sortedData?.map(({ id, name, amount, pricePerUnit, order }) => (
        <TableRow key={id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>{order}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{getValueWithCurrency(pricePerUnit, t)}</TableCell>
            <TableCell align="right">{getValueWithCurrency(pricePerUnit * amount, t)}</TableCell>
        </TableRow>
    ));

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>{tableHead}</TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default PTable;
