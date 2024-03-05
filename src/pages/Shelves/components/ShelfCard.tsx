import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { format } from "date-fns";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ShelfIcon from "@mui/icons-material/Inventory";

import { shelvesApi } from "@store/apis/shelves.api";

import { DATE_TIME_FORMAT, PAGE_PATH } from "@utils/constants/common.constants";
import { getValueWithVolumeUnit, getValueWithWeightUnit } from "@utils/helpers/getValueWithUnits.helpers";
import { CardContainer, CardIconWrapper, CardMenu } from "@utils/styles/Cards.styled";
import { Shelf, UpdateShelfDto } from "@utils/typings/types/shelves/shelves.types";

import { DropdownMenuItem } from "@components/DropdownMenu";
import { Body1Typography, Body2Typography } from "@components/Typography";

import ChangeNameModal, { OnChangeName } from "../../../App/Modals/ChangeNameModal/ChangeNameModal";
import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";
import ShelfInfoModal from "../../../App/Modals/ShelfInfoModal/ShelfInfoModal";

const ShelfCard: FC<Shelf> = (shelf) => {
    const { t } = useTranslation();
    const { storageId = "" } = useParams();
    const navigate = useNavigate();
    const deleteModalHook = useModal();
    const changeNameModalHook = useModal();
    const infoModalHook = useModal();
    const [deleteShelf] = shelvesApi.useDeleteShelfMutation();
    const [changeName] = shelvesApi.useChangeShelfNameMutation();

    const { id, name, updatedAt, availableVolume, availableWeight } = shelf;

    const handleDelete = async () => {
        return await deleteShelf({ id, storageId: +storageId }).unwrap();
    };

    const handleChangeName = async (body: UpdateShelfDto) => {
        return await changeName(body).unwrap();
    };

    const handleClick = () => {
        navigate(`${PAGE_PATH.products.main}/${id}`);
    };

    const menuItems: DropdownMenuItem[] = [
        {
            icon: <InfoIcon color="primary" />,
            titleTranslationKey: "general.otherInfo",
            onClick: infoModalHook.openModal
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
        <CardContainer>
            <CardMenu menuItems={menuItems} />

            <CardIconWrapper>
                <ShelfIcon onClick={handleClick} />
            </CardIconWrapper>

            <Body1Typography>{name}</Body1Typography>

            <Body2Typography color="text.secondary">
                {t("general.availableWeight")}: {getValueWithWeightUnit(availableWeight, t)}
            </Body2Typography>

            <Body2Typography color="text.secondary">
                {t("general.availableVolume")}: {getValueWithVolumeUnit(availableVolume, t)}
            </Body2Typography>

            <Body2Typography color="text.secondary">
                {t("general.updatedAt")}: {format(new Date(updatedAt), DATE_TIME_FORMAT.shortDate)}
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

            <ShelfInfoModal modalHook={infoModalHook} shelf={shelf} />
        </CardContainer>
    );
};

export default ShelfCard;
