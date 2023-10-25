import React, { FC, ReactNode } from "react";

import styled from "styled-components/macro";

import MuiAddIcon from "@mui/icons-material/Add";
import { Box, Paper } from "@mui/material";

const Container = styled(Paper)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    width: 100%;
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

const AddIcon = styled(MuiAddIcon)`
    cursor: pointer;
`;

type ToolBarProps = {
    onAdd?: () => void;
    leftContent?: ReactNode;
};

const ToolBar: FC<ToolBarProps> = ({ onAdd, leftContent }) => {
    return (
        <Container variant="outlined">
            <LeftPart>{leftContent}</LeftPart>
            <RightPart>{onAdd && <AddIcon onClick={onAdd} />}</RightPart>
        </Container>
    );
};

export default ToolBar;
