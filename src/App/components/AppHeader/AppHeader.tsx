import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { AppBar, Box } from "@mui/material";

import { PAGE_PATH } from "@utils/constants/common.constants";

import CurrentTab from "@components/AppHeader/components/CurrentTab";
import Profile from "@components/AppHeader/components/Profile";
import { Link } from "@components/Link";
import { H5Typography } from "@components/Typography";

import Logo from "../../../../public/favicon.ico";

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
    gap: 8px;
`;

const LeftPart = styled(ItemsContainer)`
    justify-content: flex-start;
`;

const RightPart = styled(ItemsContainer)`
    justify-content: flex-end;
`;

const StyledLink = styled(Link)`
    display: flex;
    gap: 4px;
    align-items: center;
    text-decoration: none;
    backdrop-filter: brightness(85%);
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
`;

const Img = styled.img`
    height: 32px;
    width: 32px;
`;

const AppHeader = () => {
    const { t } = useTranslation();

    return (
        <StyledHeader position="static">
            <LeftPart>
                <StyledLink to={PAGE_PATH.home}>
                    <Img src={Logo} />
                    <H5Typography color="white">{t("general.pageName")}</H5Typography>
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
