import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShelfIcon from "@mui/icons-material/Inventory";

import { shelvesApi } from "@store/apis/shelves.api";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { UpdateShelfDto, UserShelf } from "@utils/typings/types/shelves/shelves.types";

import { DropdownMenuItem } from "@components/DropdownMenu";
import ItemCard from "@components/ItemCard";

import ChangeNameModal, { OnChangeName } from "../../../App/Modals/ChangeNameModal/ChangeNameModal";
import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";

const Shelf: FC<UserShelf> = ({ id, name, createdAt }) => {
    const { storageId = "" } = useParams();
    const navigate = useNavigate();
    const deleteModalHook = useModal();
    const changeNameModalHook = useModal();
    const [deleteShelf] = shelvesApi.useDeleteShelfMutation();
    const [changeName] = shelvesApi.useChangeShelfNameMutation();

    const handleDelete = async () => {
        return await deleteShelf({ id, storageId: +storageId }).unwrap();
    };

    const handleChangeName = async (body: UpdateShelfDto) => {
        return await changeName(body).unwrap();
    };

    const handleClick = () => {
        navigate(`${PAGE_PATH.products}/${id}`);
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
            <ItemCard menuItems={menuItems} icon={<ShelfIcon onClick={handleClick} />} name={name} createdAt={createdAt} />
            <ConfirmModal
                modalHook={deleteModalHook}
                titleTranslationKey="modal.deleteShelf.title"
                titleTranslationValues={{ name }}
                onConfirm={handleDelete}
            />
            <ChangeNameModal
                modalHook={changeNameModalHook}
                initialName={name}
                restRequestProps={{ id, storageId: +storageId }}
                onConfirm={handleChangeName as OnChangeName}
            />
        </>
    );
};

export default Shelf;
