import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";

import { UsePaginationReturns } from "@utils/hooks/usePagination.hook";

const Select = styled(MuiSelect)`
    min-width: 150px;
`;

type ProductsPerPageSelectProps = {
    rowsPerPageOptions: number[];
    rowsPerPage: number;
    handleChangeRowsPerPage: UsePaginationReturns["handleChangeRowsPerPage"];
};
const ProductsPerPageSelect: FC<ProductsPerPageSelectProps> = ({ rowsPerPageOptions, rowsPerPage, handleChangeRowsPerPage }) => {
    const { t } = useTranslation();

    const items = rowsPerPageOptions.map((value) => (
        <MenuItem key={value} value={value}>
            {value}
        </MenuItem>
    ));

    return (
        <FormControl size="small">
            <InputLabel>{t("general.productsPerPage")}</InputLabel>
            <Select label={t("general.productsPerPage")} value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                {items}
            </Select>
        </FormControl>
    );
};

export default ProductsPerPageSelect;
