import React, { FC, MouseEvent, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, BoxProps, IconButton, Menu, MenuItem, Tooltip, TooltipProps as MuiTooltipProps } from "@mui/material";

import { Body2Typography } from "@components/Typography";

const StyledMenuItem = styled(MenuItem)`
    display: flex;
    gap: 4px;
    padding: 4px 8px;
    text-align: start;
`;

type TooltipProps = {
    messageTranslationKey: string;
    messageTranslationValues?: { [key in string]: string };
} & Omit<MuiTooltipProps, "title" | "children">;

export type DropdownMenuItem = {
    icon?: ReactNode;
    isDisabled?: boolean;
    titleTranslationKey: string;
    onClick: () => void;
    tooltipProps?: TooltipProps
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

    const menuElements = menuItems.map(({ titleTranslationKey, onClick, icon, isDisabled, tooltipProps }) => {
        const handleItemClick = () => {
            onClick();
            handleClose();
        };

        if (tooltipProps) {
            const { messageTranslationKey, messageTranslationValues, ...restTooltipProps } = tooltipProps;

            return <Tooltip arrow {...restTooltipProps} title={isDisabled && t(messageTranslationKey, messageTranslationValues)} key={titleTranslationKey}>
                <span>
                    <StyledMenuItem disabled={isDisabled} key={titleTranslationKey} onClick={handleItemClick}>
                        {icon}
                        <Body2Typography>{t(titleTranslationKey)}</Body2Typography>
                    </StyledMenuItem>
                </span>
            </Tooltip>;
        }

        return (
            <StyledMenuItem disabled={isDisabled} key={titleTranslationKey} onClick={handleItemClick}>
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
