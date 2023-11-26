import { ChangeEvent, ReactNode, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

type UsePaginationProps = {
    rowsPerPageOptions: number[];
    onChangePage?: () => void;
    onChangeRowsPerPage?: () => void;
};

export type UsePaginationReturns = {
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>, child?: ReactNode) => void;
};

type UsePagination = (props: UsePaginationProps) => UsePaginationReturns;

export const usePagination: UsePagination = ({ rowsPerPageOptions, onChangePage, onChangeRowsPerPage }) => {
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[0]);

    const handleChangePage: UsePaginationReturns["handleChangePage"] = (_, newPage) => {
        setPage(newPage);
        onChangePage?.();
    };

    const handleChangeRowsPerPage: UsePaginationReturns["handleChangeRowsPerPage"] = (event) => {
        const value = +event.target.value;

        if (isNaN(value)) {
            throw new Error("Value must be a number");
        }

        setRowsPerPage(value);
        setPage(1);
        onChangeRowsPerPage?.();
    };

    return {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    };
};
