import styled from "styled-components";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import { Box, Paper } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";

import DropdownMenu, { DropdownMenuItem } from "@components/DropdownMenu";
import { Body1Typography, Body2Typography } from "@components/Typography";

const Container = styled(Paper)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 8px;
    padding: 16px;
    width: fit-content;
`;

const IconWrapper = styled(Box)`
    svg {
        color: ${({ theme }) => theme.palette.primary.main};
        height: 64px;
        width: 64px;
    }

    cursor: pointer;
`;

const StyledMenu = styled(DropdownMenu)`
    position: absolute;
    right: 4px;
    top: 8px;
`;

type ItemCardProps = {
    menuItems: DropdownMenuItem[];
    icon: ReactNode;
    name: string;
    createdAt: string;
};

const ItemCard: FC<ItemCardProps> = ({ menuItems, name, createdAt, icon }) => {
    const { t } = useTranslation();

    return (
        <Container variant="elevation">
            <StyledMenu menuItems={menuItems} />
            <IconWrapper>{icon}</IconWrapper>
            <Body1Typography>{name}</Body1Typography>
            <Body2Typography color="text.secondary">
                {t("general.createdAt", { date: format(new Date(createdAt), DATE_TIME_FORMAT.shortDate) })}
            </Body2Typography>
        </Container>
    );
};

export default ItemCard;
