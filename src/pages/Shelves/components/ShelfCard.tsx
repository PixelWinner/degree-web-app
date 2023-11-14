import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { format } from "date-fns";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShelfIcon from "@mui/icons-material/Inventory";

import { shelvesApi } from "@store/apis/shelves.api";

import { DATE_TIME_FORMAT, PAGE_PATH } from "@utils/constants/common.constants";
import { CardContainer, CardIconWrapper, CardMenu } from "@utils/styles/Cards.styled";
import { Shelf, UpdateShelfDto } from "@utils/typings/types/shelves/shelves.types";

import { DropdownMenuItem } from "@components/DropdownMenu";
import { Body1Typography, Body2Typography } from "@components/Typography";

import ChangeNameModal, { OnChangeName } from "../../../App/Modals/ChangeNameModal/ChangeNameModal";
import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";

const ShelfCard: FC<Shelf> = ({ id, name, createdAt, updatedAt, availableVolume, availableWeight }) => {
    const { t } = useTranslation();
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
        <CardContainer>
            <CardMenu menuItems={menuItems} />

            <CardIconWrapper>
                <ShelfIcon onClick={handleClick} />
            </CardIconWrapper>

            <Body1Typography>{name}</Body1Typography>

            <Body2Typography color="text.secondary"> {t("general.availableWeight", { availableWeight })}</Body2Typography>

            <Body2Typography color="text.secondary">{t("general.availableVolume", { availableVolume })}</Body2Typography>

            <Body2Typography color="text.secondary">
                {t("general.createdAt", { date: format(new Date(createdAt), DATE_TIME_FORMAT.shortDate) })}
            </Body2Typography>

            <Body2Typography color="text.secondary">
                {t("general.updatedAt", { date: format(new Date(updatedAt), DATE_TIME_FORMAT.shortDate) })}
            </Body2Typography>

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
        </CardContainer>
    );
};

export default ShelfCard;
