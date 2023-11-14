import React from "react";
import { useTranslation } from "react-i18next";

import StorageCard from "@pages/Storages/components/StorageCard";

import { storagesApi } from "@store/apis/storages.api";

import { CardsContainerStyled } from "@utils/styles/Cards.styled";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import CreateStorageModal from "../../App/Modals/CreateStorageModal/CreateStorageModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";

const Storages = () => {
    const { t } = useTranslation();
    const { data, isLoading, isError } = storagesApi.useGetStoragesQuery();
    const modalHook = useModal();

    if (isLoading || isError) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    const storages = data?.map((storage) => <StorageCard key={storage.id} {...storage} />);

    const toolBarButtons = (
        <>
            <BackButton />
            <Button onClick={modalHook.openModal}>{t("general.addStorage")}</Button>
        </>
    );

    return (
        <>
            <ToolBar leftPart={toolBarButtons} />
            <CardsContainerStyled>{storages}</CardsContainerStyled>
            <CreateStorageModal modalHook={modalHook} />
        </>
    );
};

export default Storages;
