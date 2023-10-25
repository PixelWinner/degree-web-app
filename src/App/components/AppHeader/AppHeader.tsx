import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { AppBar } from "@mui/material";

import Profile from "@components/AppHeader/components/Profile";
import { H5Typography } from "@components/Typography";

const StyledHeader = styled(AppBar)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 8px;
`;

const AppHeader = () => {
    const { t } = useTranslation();

    return (
        <StyledHeader position="static">
            <H5Typography>{t("general.pageName")}</H5Typography>
            <Profile />
        </StyledHeader>
    );
};

export default AppHeader;
