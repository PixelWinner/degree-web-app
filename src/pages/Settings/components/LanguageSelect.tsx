import styled from "styled-components";

import React from "react";
import { useTranslation } from "react-i18next";

import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { Locale } from "@utils/typings/enums/common.enums";

import { Body1Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 0 0 4px 0;
`;

const LanguageSelect = () => {
    const { i18n, t } = useTranslation();

    const handleChange = async (event: SelectChangeEvent) => {
        await i18n.changeLanguage(event.target.value);
    };

    const menuItems = Object.values(Locale).map((locale) => (
        <MenuItem key={locale} value={locale}>
            {t("general.currentLanguage", { lng: locale })}
        </MenuItem>
    ));

    return (
        <Container>
            <Body1Typography>{t("general.language")}</Body1Typography>
            <Select size="small" id="language-select" value={i18n.language} onChange={handleChange}>
                {menuItems}
            </Select>
        </Container>
    );
};

export default LanguageSelect;
