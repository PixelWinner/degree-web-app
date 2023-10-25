import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StorageIcon from "@mui/icons-material/WarehouseOutlined";

import { storagesApi } from "@store/apis/storages.api";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { UpdateStorageDto, UserStorage } from "@utils/typings/types/storages/storages.types";

import { DropdownMenuItem } from "@components/DropdownMenu";
import ItemCard from "@components/ItemCard";

import ChangeNameModal, { OnChangeName } from "../../../App/Modals/ChangeNameModal/ChangeNameModal";
import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";

const Storage: FC<UserStorage> = ({ id, name, createdAt }) => {
    const navigate = useNavigate();
    const deleteModalHook = useModal();
    const changeNameModalHook = useModal();
    const [deleteStorage] = storagesApi.useDeleteStorageMutation();
    const [changeName] = storagesApi.useChangeNameMutation();

    const handleDelete = async () => {
        return await deleteStorage({ id }).unwrap();
    };

    const handleChangeName = async (body: UpdateStorageDto) => {
        return await changeName(body).unwrap();
    };

    const handleClick = () => {
        navigate(`${PAGE_PATH.shelves}/${id}`);
    };

    const menuItems: DropdownMenuItem[] = [
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
            <ItemCard menuItems={menuItems} icon={<StorageIcon onClick={handleClick} />} name={name} createdAt={createdAt} />
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
