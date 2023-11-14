import styled from "styled-components";

import { Box, Paper } from "@mui/material";

import DropdownMenu from "@components/DropdownMenu";

export const CardsContainerStyled = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    overflow: auto;
`;

export const CardContainer = styled(Paper)`
    height: 240px;
    width: 240px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    margin: 8px;
    padding: 16px;
`;

export const CardMenu = styled(DropdownMenu)`
    position: absolute;
    right: 4px;
    top: 8px;
`;

export const CardIconWrapper = styled(Box)`
    svg {
        height: 64px;
        width: 64px;
        cursor: pointer;
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;
