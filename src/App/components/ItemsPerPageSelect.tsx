import React, { FC } from "react";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { UsePaginationReturns } from "@utils/hooks/usePagination.hook";
import { useTranslation } from "react-i18next";

const Select = styled(MuiSelect)`
    min-width: 200px;
`;

type ItemsPerPageSelectProps = {
    titleTranslationKey: string;
    itemsPerPageOptions: number[];
    itemsPerPage: number;
    handleChangeItemsPerPage: UsePaginationReturns["handleChangeItemsPerPage"];
};

const ItemsPerPageSelect: FC<ItemsPerPageSelectProps> = ({ titleTranslationKey, itemsPerPageOptions, itemsPerPage, handleChangeItemsPerPage }) => {
    const { t } = useTranslation();

    const items = itemsPerPageOptions.map((value) => (
        <MenuItem key={value} value={value}>
            {value}
        </MenuItem>
    ));

    return (
        <FormControl size="small">
            <InputLabel>{t(titleTranslationKey)}</InputLabel>
            <Select label={t(titleTranslationKey)} value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                {items}
            </Select>
        </FormControl>
    );
};

export default ItemsPerPageSelect;