import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Shelf from "@pages/Shelves/components/Shelf";

import { shelvesApi } from "@store/apis/shelves.api";

import { CardsContainer } from "@utils/styles/CardsContainer";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import CreateShelfModal from "../../App/Modals/CreateShelfModal/CreateShelfModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";

const Shelves = () => {
    const { storageId = "" } = useParams();
    const { t } = useTranslation();
    const { data, isLoading, isError } = shelvesApi.useGetShelvesQuery(+storageId, { skip: !storageId });
    const modalHook = useModal();

    if (isLoading || isError) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    const shelves = data?.map((shelf) => <Shelf key={shelf.id} {...shelf} />);

    const toolBarButtons = (
        <>
            <BackButton />
            <Button onClick={modalHook.openModal}>{t("general.addShelf")}</Button>
        </>
    );

    return (
        <>
            <ToolBar leftPart={toolBarButtons} />
            <CardsContainer>{shelves}</CardsContainer>
            <CreateShelfModal modalHook={modalHook} storageId={+storageId} />
        </>
    );
};

export default Shelves;
