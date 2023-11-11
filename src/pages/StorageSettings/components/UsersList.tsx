import styled from "styled-components";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MuiDeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, ListItemIcon, ListItemText, List as MuiList, ListItem as MuiListItem } from "@mui/material";

import { storagesApi } from "@store/apis/storages.api";
import { selectUserData } from "@store/slices/userData/userData.selectors";
import { UserData } from "@store/slices/userData/userData.types";
import { useAppSelector } from "@store/store.hooks";

import { H5Typography } from "@components/Typography";

import ConfirmModal from "../../../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../../../App/Modals/Modal/useModal.hook";

const List = styled(MuiList)`
    max-height: 240px;
    overflow: auto;
    padding: 0;
`;

const ListItem = styled(MuiListItem)`
    padding: 0;

    .MuiListItemText-primary,
    .MuiListItemText-secondary {
        color: ${({ theme }) => theme.palette.text.primary};
    }
`;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const DeleteIcon = styled(MuiDeleteIcon)`
    cursor: pointer;
`;

type UsersListProps = {
    users: UserData[];
    ownerId: number;
    storageId: number;
};

const UsersList: FC<UsersListProps> = ({ users, ownerId, storageId }) => {
    const { t } = useTranslation();

    const listItems = users.map(({ name, email, id }) => {
        const isOwner = id === ownerId;
        const title = isOwner ? `${name} (${t("general.owner")})` : name;

        return (
            <ListItem key={email} secondaryAction={<DeleteButton userId={id} ownerId={ownerId} storageId={storageId} name={name} />}>
                <ListItemIcon>
                    <AccountCircleIcon fontSize="large" color="primary" />
                </ListItemIcon>

                <ListItemText primary={title} secondary={email} />
            </ListItem>
        );
    });

    return (
        <Container>
            <H5Typography fontWeight="bold">{t("general.usersList")}</H5Typography>
            <List dense>{listItems}</List>
        </Container>
    );
};

export default UsersList;

type DeleteButtonProps = {
    ownerId: number;
    storageId: number;
    userId: number | undefined;
    name: string | undefined;
};

const DeleteButton: FC<DeleteButtonProps> = ({ userId, ownerId, storageId, name }) => {
    const { id } = useAppSelector(selectUserData);
    const modalHook = useModal();
    const [deleteUser] = storagesApi.useDeleteUserFromStorageMutation();

    if (!userId || !name || ownerId === userId || id !== ownerId) {
        return null;
    }

    const handleConfirm = async () => {
        await deleteUser({ id: storageId, userId }).unwrap();
    };

    return (
        <IconButton edge="end" color="primary" onClick={modalHook.openModal}>
            <DeleteIcon />
            <ConfirmModal
                modalHook={modalHook}
                titleTranslationKey="modal.deleteUserFromStorage.title"
                titleTranslationValues={{ name }}
                onConfirm={handleConfirm}
            />
        </IconButton>
    );
};
