import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import StorageIcon from "@mui/icons-material/WarehouseOutlined";

import { storagesApi } from "@store/apis/storages.api";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { TStorage, UpdateStorageDto } from "@utils/typings/types/storages/storages.types";

import { DropdownMenuItem } from "@components/DropdownMenu";
import ItemCard from "@components/ItemCard";

import ChangeNameModal, { OnChangeName } from "../../../App/Modals/ChangeNameModal/ChangeNameModal";
import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";

const Storage: FC<TStorage> = ({ id, name, createdAt, address }) => {
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
        <>
            <ItemCard menuItems={menuItems} icon={<StorageIcon onClick={handleOnIconClick} />} name={name} address={address} createdAt={createdAt} />
            <ConfirmModal
                modalHook={deleteModalHook}
                titleTranslationKey="modal.deleteStorage.title"
                titleTranslationValues={{ name }}
                onConfirm={handleDelete}
            />
            <ChangeNameModal modalHook={changeNameModalHook} initialName={name} restRequestProps={{ id }} onConfirm={handleChangeName as OnChangeName} />
        </>
    );
};

export default Storage;
