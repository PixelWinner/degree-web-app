import styled from "styled-components";

import React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import Shelf from "@pages/Shelves/components/Shelf";

import { shelvesApi } from "@store/apis/shelves.api";

import { PAGE_PATH } from "@utils/constants/common.constants";

import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import CreateShelfModal from "../../App/Modals/CreateShelfModal/CreateShelfModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";

const Container = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    overflow: auto;
`;

const Shelves = () => {
    const { storageId = "" } = useParams();
    const { data, isLoading, isError } = shelvesApi.useGetShelvesQuery(+storageId, { skip: !storageId });
    const modalHook = useModal();

    if (isLoading || isError) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    const shelves = data?.map((shelf) => <Shelf key={shelf.id} {...shelf} />);

    return (
        <>
            <ToolBar onAdd={modalHook.openModal} previousPath={PAGE_PATH.storages} />
            <Container>{shelves}</Container>
            <CreateShelfModal modalHook={modalHook} storageId={+storageId} />
        </>
    );
};

export default Shelves;
