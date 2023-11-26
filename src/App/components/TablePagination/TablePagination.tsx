import React, { FC } from "react";

import { TablePagination as MuiTablePagination } from "@mui/material";

import { UsePaginationReturns } from "@utils/hooks/usePagination.hook";

import TablePaginationActions from "./components/TablePaginationActions";

type TablePaginationProps = {
    rowsPerPageOptions: number[];
    rowsCount: number;
    columnsCount: number;
    rowsPerPage: number;
    page: number;
    handleChangePage: UsePaginationReturns["handleChangePage"];
    handleChangeRowsPerPage: UsePaginationReturns["handleChangeRowsPerPage"];
};

const TablePagination: FC<TablePaginationProps> = ({
    rowsPerPageOptions,
    rowsCount,
    columnsCount,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage
}) => {
    return (
        <MuiTablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            colSpan={columnsCount}
            count={rowsCount}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            SelectProps={{
                inputProps: {
                    "aria-label": "rows per page"
                }
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
        />
    );
};

export default TablePagination;
