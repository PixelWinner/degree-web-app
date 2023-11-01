import React, { FC } from "react";

import styled from "styled-components/macro";

import MuiAddIcon from "@mui/icons-material/Add";
import MuiDeleteIcon from "@mui/icons-material/Delete";
import { Box, Paper } from "@mui/material";

import BackButton from "@components/BackButton";

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

const DeleteIcon = styled(MuiDeleteIcon)`
    cursor: pointer;
`;

type ToolBarProps = {
    onAdd?: () => void;
    onDelete?: () => void;
    previousPath?: string;
};

const ToolBar: FC<ToolBarProps> = ({ onAdd, onDelete, previousPath }) => {
    return (
        <Container variant="outlined">
            <LeftPart>{previousPath && <BackButton path={previousPath} />}</LeftPart>
            <RightPart>
                {onAdd && <AddIcon onClick={onAdd} />}
                {onDelete && <DeleteIcon onClick={onDelete} />}
            </RightPart>
        </Container>
    );
};

export default ToolBar;
