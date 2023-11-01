import React from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import StorageInfo from "@pages/Storages/components/StorageSettings/components/StorageInfo";
import UsersList from "@pages/Storages/components/StorageSettings/components/UsersList";

import { storagesApi } from "@store/apis/storages.api";

import { PAGE_PATH } from "@utils/constants/common.constants";

import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import AddUserToStorageModal from "../../../../App/Modals/AddUserToStorageModal/AddUserToStorageModal";
import { useModal } from "../../../../App/Modals/Modal/useModal.hook";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
`;

const StorageSettings = () => {
    const { storageId = "" } = useParams();
    const { data, isLoading, isError } = storagesApi.useGetStorageDataQuery(+storageId, { skip: !storageId });
    const modalHook = useModal();

    if (isLoading || isError || !data) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    return (
        <>
            <ToolBar previousPath={PAGE_PATH.storages} onAdd={modalHook.openModal} />
            <Container>
                <StorageInfo storage={data.storage} />

                <UsersList users={data.users} ownerId={data.storage.ownerId} storageId={+storageId} />
            </Container>
            <AddUserToStorageModal modalHook={modalHook} storageId={+storageId} />
        </>
    );
};

export default StorageSettings;
