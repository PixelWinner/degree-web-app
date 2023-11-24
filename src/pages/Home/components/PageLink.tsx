import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styled from "styled-components/macro";

import { Paper } from "@mui/material";

import { H5Typography } from "@components/Typography";

const Container = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    gap: 6px;
    padding: 8px;
    width: fit-content;
    cursor: pointer;

    @media (max-width: 480px) {
        width: 100%;
    }

    svg {
        height: 40px;
        width: 40px;
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
            <H5Typography>{t(titleTranslationKey)}</H5Typography>
        </Container>
    );
};

export default PageLink;
