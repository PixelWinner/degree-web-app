import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/WarehouseOutlined";

import { storagesApi } from "@store/apis/storages.api";

import { DATE_TIME_FORMAT, PAGE_PATH } from "@utils/constants/common.constants";
import { CardContainer, CardIconWrapper, CardMenu } from "@utils/styles/Cards.styled";
import { TStorage, UpdateStorageDto } from "@utils/typings/types/storages/storages.types";

import { DropdownMenuItem } from "@components/DropdownMenu";
import { Body1Typography, Body2Typography } from "@components/Typography";

import ChangeNameModal, { OnChangeName } from "../../../App/Modals/ChangeNameModal/ChangeNameModal";
import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";

const StorageCard: FC<TStorage> = ({ id, name, address, updatedAt }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const deleteModalHook = useModal();
    const changeNameModalHook = useModal();
    const [deleteStorage] = storagesApi.useDeleteStorageMutation();
    const [changeName] = storagesApi.useChangeStorageNameMutation();

    const handleDelete = async () => {
        return await deleteStorage({ id }).unwrap();
    };

    const handleChangeName = async (body: UpdateStorageDto) => {
        return await changeName(body).unwrap();
    };

    const handleOnIconClick = () => {
        navigate(`${PAGE_PATH.shelves}/${id}`);
    };

    const handleOnSettingsClick = () => {
        navigate(`${PAGE_PATH.storages}/${id}`);
    };

    const menuItems: DropdownMenuItem[] = [
        {
            icon: <SettingsIcon color="primary" />,
            titleTranslationKey: "general.settings",
            onClick: handleOnSettingsClick
        },
        {
            icon: <EditIcon color="primary" />,
            titleTranslationKey: "general.edit",
            onClick: changeNameModalHook.openModal
        },
        {
            icon: <DeleteIcon color="primary" />,
            titleTranslationKey: "general.delete",
            onClick: deleteModalHook.openModal
        }
    ];

    return (
        <CardContainer variant="elevation">
            <CardMenu menuItems={menuItems} />

            <CardIconWrapper>
                <StorageIcon onClick={handleOnIconClick} />
            </CardIconWrapper>

            <Body1Typography>{name}</Body1Typography>

            <Body2Typography color="text.secondary">
                {t("general.address")}: {address}
            </Body2Typography>

            <Body2Typography color="text.secondary">
                {t("general.updatedAt")}: {format(new Date(updatedAt), DATE_TIME_FORMAT.shortDate)}
            </Body2Typography>

            <ConfirmModal
                modalHook={deleteModalHook}
                titleTranslationKey="modal.deleteStorage.title"
                titleTranslationValues={{ name }}
                onConfirm={handleDelete}
            />

            <ChangeNameModal modalHook={changeNameModalHook} initialName={name} restRequestProps={{ id }} onConfirm={handleChangeName as OnChangeName} />
        </CardContainer>
    );
};

export default StorageCard;
