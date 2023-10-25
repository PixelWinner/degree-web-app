import React, { FC, MouseEvent, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, BoxProps, IconButton, Menu, MenuItem } from "@mui/material";

import { Body2Typography } from "@components/Typography";

const StyledMenuItem = styled(MenuItem)`
    display: flex;
    gap: 4px;
    padding: 4px 8px;
    text-align: start;
`;

export type DropdownMenuItem = {
    icon?: ReactNode;
    titleTranslationKey: string;
    onClick: () => void;
};

type DropdownMenuProps = { menuItems: DropdownMenuItem[] } & BoxProps;
const DropdownMenu: FC<DropdownMenuProps> = ({ menuItems, ...rest }) => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuElements = menuItems.map(({ titleTranslationKey, onClick, icon }) => {
        const handleItemClick = () => {
            onClick();
            handleClose();
        };

        return (
            <StyledMenuItem key={titleTranslationKey} onClick={handleItemClick}>
                {icon}
                <Body2Typography>{t(titleTranslationKey)}</Body2Typography>
            </StyledMenuItem>
        );
    });

    return (
        <Box {...rest}>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
                {menuElements}
            </Menu>
        </Box>
    );
};

export default DropdownMenu;
