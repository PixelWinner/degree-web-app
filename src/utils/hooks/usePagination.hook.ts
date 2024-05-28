import { ChangeEvent, ReactNode, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

type UsePaginationProps = {
    itemsPerPageOptions: number[];
    onChangePage?: () => void;
    onChangeItemsPerPage?: () => void;
};

export type UsePaginationReturns = {
    page: number;
    itemsPerPage: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeItemsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>, child?: ReactNode) => void;
};

type UsePagination = (props: UsePaginationProps) => UsePaginationReturns;

export const usePagination: UsePagination = ({ itemsPerPageOptions, onChangePage, onChangeItemsPerPage }) => {
    const [page, setPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageOptions[0]);

    const handleChangePage: UsePaginationReturns["handleChangePage"] = (_, newPage) => {
        setPage(newPage);
        onChangePage?.();
    };

    const handleChangeItemsPerPage: UsePaginationReturns["handleChangeItemsPerPage"] = (event) => {
        const value = +event.target.value;

        if (isNaN(value)) {
            throw new Error("Value must be a number");
        }

        setItemsPerPage(value);
        setPage(1);
        onChangeItemsPerPage?.();
    };

    return {
        page,
        itemsPerPage,
        handleChangePage,
        handleChangeItemsPerPage
    };
};
