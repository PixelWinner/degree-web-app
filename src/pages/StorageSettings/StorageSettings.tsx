import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import StorageInfo from "@pages/StorageSettings/components/StorageInfo";
import UsersList from "@pages/StorageSettings/components/UsersList";

import { storagesApi } from "@store/apis/storages.api";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import AddUserToStorageModal from "../../App/Modals/AddUserToStorageModal/AddUserToStorageModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
`;

const StorageSettings = () => {
    const { t } = useTranslation();
    const { storageId = "" } = useParams();
    const { data, isLoading, isError } = storagesApi.useGetStorageDataQuery(+storageId, { skip: !storageId });
    const modalHook = useModal();

    if (isLoading || isError || !data) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    const toolBarButtons = (
        <>
            <BackButton />
            <Button size="small" onClick={modalHook.openModal}>
                {t("general.addUser")}
            </Button>
        </>
    );

    return (
        <>
            <ToolBar rightPart={toolBarButtons} />
            <Container>
                <StorageInfo storage={data.storage} />

                <UsersList users={data.users} ownerId={data.storage.ownerId} storageId={+storageId} />
            </Container>
            <AddUserToStorageModal modalHook={modalHook} storageId={+storageId} />
        </>
    );
};

export default StorageSettings;
