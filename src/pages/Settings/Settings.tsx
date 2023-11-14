import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box, Divider as MuiDivider, Paper } from "@mui/material";

import LanguageSelect from "@pages/Settings/components/LanguageSelect";
import ThemeSwitch from "@pages/Settings/components/ThemeSwitch";

import BackButton from "@components/BackButton";
import { H5Typography } from "@components/Typography";

const Container = styled(Paper)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    margin: 16px;
    padding: 16px;
`;

const Divider = styled(MuiDivider)`
    width: 100%;
`;

const Header = styled(Box)`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 16px;
`;

const Settings = () => {
    const { t } = useTranslation();

    return (
        <Container variant="elevation">
            <Header>
                <H5Typography>{t("general.settings")}</H5Typography>
                <BackButton />
            </Header>

            <Divider />
            <ThemeSwitch />
            <LanguageSelect />
        </Container>
    );
};

export default Settings;
