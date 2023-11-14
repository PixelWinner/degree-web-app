import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import ShelfCard from "@pages/Shelves/components/ShelfCard";

import { shelvesApi } from "@store/apis/shelves.api";

import { CardsContainerStyled } from "@utils/styles/Cards.styled";

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

    const shelves = data?.map((shelf) => <ShelfCard key={shelf.id} {...shelf} />);

    const toolBarButtons = (
        <>
            <BackButton />
            <Button onClick={modalHook.openModal}>{t("general.addShelf")}</Button>
        </>
    );

    return (
        <>
            <ToolBar leftPart={toolBarButtons} />
            <CardsContainerStyled>{shelves}</CardsContainerStyled>
            <CreateShelfModal modalHook={modalHook} storageId={+storageId} />
        </>
    );
};

export default Shelves;
