import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styled from "styled-components/macro";

import { Paper } from "@mui/material";

import { Body1Typography } from "@components/Typography";

const Container = styled(Paper)`
    display: flex;
    flex-direction: row;
    gap: 4px;
    padding: 8px;
    width: fit-content;
    cursor: pointer;

    svg {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

type PageLinkProps = {
    icon?: ReactNode;
    titleTranslationKey: string;
    href: string;
};

const PageLink: FC<PageLinkProps> = ({ icon, titleTranslationKey, href }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(href);
    };

    return (
        <Container variant="elevation" onClick={handleClick}>
            {icon}
            <Body1Typography>{t(titleTranslationKey)}</Body1Typography>
        </Container>
    );
};

export default PageLink;
