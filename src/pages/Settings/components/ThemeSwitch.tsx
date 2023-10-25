import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box, Switch } from "@mui/material";

import { useThemeContext } from "@utils/providers/ThemeProvider";
import { ThemeMode } from "@utils/typings/enums/common.enums";

import { Body1Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const ThemeSwitch = () => {
    const { t } = useTranslation();
    const { themeMode, toggleThemeMode } = useThemeContext();

    return (
        <Container>
            <Body1Typography>{t("general.darkMode")}</Body1Typography>
            <Switch onClick={toggleThemeMode} checked={themeMode === ThemeMode.DARK} />
        </Container>
    );
};

export default ThemeSwitch;
