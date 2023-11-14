import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { AppBar, Box } from "@mui/material";

import { PAGE_PATH } from "@utils/constants/common.constants";

import CurrentTab from "@components/AppHeader/components/CurrentTab";
import Profile from "@components/AppHeader/components/Profile";
import { Link } from "@components/Link";
import { H5Typography } from "@components/Typography";

const StyledHeader = styled(AppBar)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    gap: 4px;
`;

const ItemsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const LeftPart = styled(ItemsContainer)`
    justify-content: flex-start;
`;

const RightPart = styled(ItemsContainer)`
    justify-content: flex-end;
`;

const TitleTypography = styled(H5Typography)`
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const AppHeader = () => {
    const { t } = useTranslation();

    return (
        <StyledHeader position="static">
            <LeftPart>
                <StyledLink to={PAGE_PATH.home}>
                    <TitleTypography>{t("general.pageName")}</TitleTypography>
                </StyledLink>

                <CurrentTab />
            </LeftPart>

            <RightPart>
                <Profile />
            </RightPart>
        </StyledHeader>
    );
};

export default AppHeader;
