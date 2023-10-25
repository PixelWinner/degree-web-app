import React, { FC, MouseEvent, PropsWithChildren } from "react";

import styled from "styled-components/macro";

import { Fade, Modal as MuiModal, Paper } from "@mui/material";

import { ModalComponentProps } from "../modal.types";

const StyledModal = styled(MuiModal)`
    display: flex;
    align-items: center;
    justify-content: center;

    & .MuiBackdrop-root {
        backdrop-filter: blur(20px);
    }
`;

const Wrapper = styled(Paper)`
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: 8px;
    padding: 16px;
    margin: 16px;
`;

export const Modal: FC<ModalComponentProps & PropsWithChildren> = ({ isOpened, children, fadeProps, ...rest }) => {
    const disabledPropagationClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        rest?.onClick?.(event);
    };

    return (
        <StyledModal open={!!isOpened} {...rest} onClick={disabledPropagationClick}>
            <Fade in={isOpened} {...fadeProps}>
                <Wrapper variant="elevation">{children}</Wrapper>
            </Fade>
        </StyledModal>
    );
};
