import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components/macro";

import { Box, FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";

import { storagesApi } from "@store/apis/storages.api";

import { PAGE_PATH } from "@utils/constants/common.constants";

import NoDataMessage from "@components/NoDataMessage";
import { SelfCenterLoader } from "@components/SelfCenterLoader";

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 4px;
`;

const Select = styled(MuiSelect)`
    min-width: 100px;
`;

const StorageShelfSelect = () => {
    const { t } = useTranslation();
    const { storageId = "", shelfId = "" } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = storagesApi.useGetStorageShelfListQuery();

    const currentStorage = data?.find((storage) => storage.id === +storageId);
    const initialStorage = storageId ? +storageId : data?.[0]?.id;
    const initialShelf = shelfId ? +shelfId : currentStorage?.shelves[0]?.id;

    useEffect(() => {
        if (initialStorage) {
            if (!initialShelf) {
                navigate(`${PAGE_PATH.productsTable}/${initialStorage}`);
                return;
            }

            navigate(`${PAGE_PATH.productsTable}/${initialStorage}/${initialShelf}`);
        }
    }, [initialStorage, initialShelf]);

    if (isLoading || isError) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    if (!data?.length) {
        return <NoDataMessage />;
    }

    const handleChangeStorage = (event: SelectChangeEvent<number>) => {
        navigate(`${PAGE_PATH.productsTable}/${event.target.value}`);
    };

    const handleChangeShelf = (event: SelectChangeEvent<number>) => {
        navigate(`${PAGE_PATH.productsTable}/${+storageId}/${event.target.value}`);
    };

    const storageItems = data?.map((storage) => (
        <MenuItem key={storage.id} value={storage.id}>
            {storage.name}
        </MenuItem>
    ));

    const shelfItems = currentStorage?.shelves.map((shelf) => (
        <MenuItem key={shelf.id} value={shelf.id}>
            {shelf.name}
        </MenuItem>
    ));

    return (
        <Container>
            <FormControl size="small">
                <InputLabel>{t("general.storage")}</InputLabel>
                <Select label={t("general.storage")} value={initialStorage} onChange={handleChangeStorage}>
                    {storageItems}
                </Select>
            </FormControl>

            {storageId && (
                <FormControl size="small">
                    <InputLabel>{t("general.shelf")}</InputLabel>
                    <Select label={t("general.shelf")} value={initialShelf} onChange={handleChangeShelf}>
                        {shelfItems}
                    </Select>
                </FormControl>
            )}
        </Container>
    );
};

export default StorageShelfSelect;
