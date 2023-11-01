import React from "react";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import Storage from "@pages/Storages/components/Storage";

import { storagesApi } from "@store/apis/storages.api";

import { PAGE_PATH } from "@utils/constants/common.constants";

import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import CreateStorageModal from "../../App/Modals/CreateStorageModal/CreateStorageModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";

const Container = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    overflow: auto;
`;

const Storages = () => {
    const { data, isLoading, isError } = storagesApi.useGetStoragesQuery();
    const modalHook = useModal();

    if (isLoading || isError) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    const storages = data?.map((storage) => <Storage key={storage.id} {...storage} />);

    return (
        <>
            <ToolBar onAdd={modalHook.openModal} previousPath={PAGE_PATH.home} />
            <Container>{storages}</Container>
            <CreateStorageModal modalHook={modalHook} />
        </>
    );
};

export default Storages;
