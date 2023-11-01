import styled, { css } from "styled-components";

import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import { Box, Paper } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";

import DropdownMenu, { DropdownMenuItem } from "@components/DropdownMenu";
import { Body1Typography, Body2Typography } from "@components/Typography";

const getContainerSize = (isCompact: boolean) => {
    if (isCompact) {
        return css`
            width: 164px;
            height: 164px;
        `;
    }

    return css`
        width: 226px;
        height: 226px;
    `;
};

const getIconSize = (isCompact: boolean) => {
    if (isCompact) {
        return css`
            width: 64px;
            height: 64px;
        `;
    }

    return css`
        width: 80px;
        height: 80px;
    `;
};

const Container = styled(Paper)<{ $isCompact: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    margin: 8px;
    padding: 16px;

    ${({ $isCompact }) => getContainerSize($isCompact)}
`;

const IconWrapper = styled(Box)<{ $isCompact: boolean }>`
    svg {
        color: ${({ theme }) => theme.palette.primary.main};
        ${({ $isCompact }) => getIconSize($isCompact)}
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
    address?: string;
    createdAt: string;
};

const ItemCard: FC<ItemCardProps> = ({ menuItems, name, address, createdAt, icon }) => {
    const { t } = useTranslation();

    return (
        <Container variant="elevation" $isCompact={!address}>
            <StyledMenu menuItems={menuItems} />
            <IconWrapper $isCompact={!address}>{icon}</IconWrapper>
            <Body1Typography>{name}</Body1Typography>
            {address && (
                <Body2Typography color="text.secondary">
                    {t("general.address")}: {address}
                </Body2Typography>
            )}
            <Body2Typography color="text.secondary">
                {t("general.createdAt", { date: format(new Date(createdAt), DATE_TIME_FORMAT.shortDate) })}
            </Body2Typography>
        </Container>
    );
};

export default ItemCard;
