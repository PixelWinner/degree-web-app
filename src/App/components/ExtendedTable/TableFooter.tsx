import styled from "styled-components";

import React from "react";

import { TableFooter as MuiTableFooter, TableRow } from "@mui/material";

import { ThemeMode } from "@utils/typings/enums/common.enums";

import { ExtendedTableProps } from "@components/ExtendedTable/ExtendedTable";
import TablePagination from "@components/TablePagination/TablePagination";

const StyledTableFooter = styled(MuiTableFooter)`
    position: sticky;
    bottom: 0;
    background-color: ${({ theme }) => (theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[900] : theme.palette.grey[200])};

    & .MuiTableCell-root {
        border-bottom: none;
    }
`;

type TableFooterProps<T> = {
    paginationProps?: ExtendedTableProps<T>["paginationProps"];
    columns: ExtendedTableProps<T>["columns"];
};
const TableFooter = <T extends object>({ paginationProps, columns }: TableFooterProps<T>) => {
    if (!paginationProps) {
        return;
    }

    return (
        <StyledTableFooter>
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
        </StyledTableFooter>
    );
};

export default TableFooter;
