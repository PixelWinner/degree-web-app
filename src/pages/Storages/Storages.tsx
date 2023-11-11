import React from "react";
import { useTranslation } from "react-i18next";

import Storage from "@pages/Storages/components/Storage";

import { storagesApi } from "@store/apis/storages.api";

import { CardsContainer } from "@utils/styles/CardsContainer";

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

    const storages = data?.map((storage) => <Storage key={storage.id} {...storage} />);

    const toolBarButtons = (
        <>
            <BackButton />
            <Button onClick={modalHook.openModal}>{t("general.addStorage")}</Button>
        </>
    );

    return (
        <>
            <ToolBar leftPart={toolBarButtons} />
            <CardsContainer>{storages}</CardsContainer>
            <CreateStorageModal modalHook={modalHook} />
        </>
    );
};

export default Storages;
