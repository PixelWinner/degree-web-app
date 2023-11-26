import React, { FC, ReactNode } from "react";

import styled from "styled-components/macro";

import { Box, Paper } from "@mui/material";

const Container = styled(Paper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    width: 100%;
    border-left: none;
    border-right: none;
    border-radius: 0;
`;

const LeftPart = styled(Box)`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
`;

const RightPart = styled(Box)`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 8px;
`;

type ToolBarProps = {
    rightPart?: ReactNode;
    leftPart?: ReactNode;
};

const ToolBar: FC<ToolBarProps> = ({ rightPart, leftPart }) => {
    return (
        <Container variant="outlined">
            <LeftPart>{leftPart}</LeftPart>
            <RightPart>{rightPart}</RightPart>
        </Container>
    );
};

export default ToolBar;
