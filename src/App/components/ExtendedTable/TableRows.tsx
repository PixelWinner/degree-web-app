import React, { useCallback, useMemo } from "react";

import isNumber from "lodash/isNumber";
import isString from "lodash/isString";

import { TableCell, TableRow } from "@mui/material";

import { ExtendedTableProps } from "@components/ExtendedTable/ExtendedTable";

type TableRowsProps<T> = {
    rows: ExtendedTableProps<T>["rows"];
    rowsProps: ExtendedTableProps<T>["rowsProps"];
    columnKeys: ExtendedTableProps<T>["columns"];
};

const TableRows = <T extends object>({ rows, rowsProps, columnKeys }: TableRowsProps<T>) => {
    const renderTableCells = useCallback(
        (item: T, columns: ExtendedTableProps<T>["columns"]) => {
            return columns.map((column, index) => {

                const value = item[column.key];
                const isValidValue = (isString(value) || isNumber(value));

                if (isValidValue) {
                    return (
                        <TableCell key={String(column.key)} align={index === columnKeys.length - 1 ? "right" : undefined}>
                            {value}
                        </TableCell>
                    );
                }
            });
        },
        [columnKeys]
    );

    return useMemo(
        () =>
            rows.map((item) => {
                if (!rowsProps) {
                    return <TableRow key={JSON.stringify(item)}>{renderTableCells(item, columnKeys)}</TableRow>;
                }

                const { onClick, ...rest } = rowsProps;

                return (
                    <TableRow key={JSON.stringify(item)} onClick={() => onClick?.(item)} {...rest}>
                        {renderTableCells(item, columnKeys)}
                    </TableRow>
                );
            }),
        [rows, columnKeys, rowsProps, renderTableCells]
    );
};

export default TableRows;
