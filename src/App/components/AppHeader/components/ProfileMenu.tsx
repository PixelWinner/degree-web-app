import styled from "styled-components";

import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Divider, Menu, MenuItem } from "@mui/material";

import { authSlice } from "@store/slices/auth/auth.slice";
import { RESET_STORE_ACTION_TYPE } from "@store/store";
import { useAppDispatch } from "@store/store.hooks";

import { PAGE_PATH } from "@utils/constants/common.constants";

import { Body1Typography } from "@components/Typography";

const NameTypography = styled(Body1Typography)`
    padding: 6px 16px;
`;

type ProfileMenuProps = {
    handleClose: () => void;
    isAuthenticated: boolean;
    userName: string | undefined;
    anchorEl: HTMLElement | null;
};

const ProfileMenu: FC<ProfileMenuProps> = ({ handleClose, userName, isAuthenticated, anchorEl }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleNavigate = useCallback(() => {
        handleClose();
        navigate(PAGE_PATH.settings);
    }, []);

    const handleLogOut = useCallback(() => {
        handleClose();
        dispatch({ type: RESET_STORE_ACTION_TYPE, payload: undefined });
        dispatch(authSlice.actions.setIsAuthenticated(false));
        navigate(PAGE_PATH.login);
    }, []);

    if (!isAuthenticated) {
        return (
            <Menu
                keepMounted
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 36,
                    horizontal: "right"
                }}
            >
                <MenuItem onClick={handleNavigate}>{t("general.settings")}</MenuItem>
            </Menu>
        );
    }

    return (
        <Menu
            keepMounted
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 36,
                horizontal: "right"
            }}
        >
            <NameTypography>{userName}</NameTypography>
            <Divider />
            <MenuItem onClick={handleNavigate}>{t("general.settings")}</MenuItem>
            <MenuItem onClick={handleLogOut}>{t("general.logOut")}</MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
