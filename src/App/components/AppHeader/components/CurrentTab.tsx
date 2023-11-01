import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import styled from "styled-components/macro";

import { Tab as MuiTab, Tabs as MuiTabs } from "@mui/material";

import { Body1Typography } from "@components/Typography";

const Tabs = styled(MuiTabs)`
    min-height: 32px;
    height: 32px;
`;

const Tab = styled(MuiTab)`
    padding: 0 4px;
    min-height: 32px;
    height: 32px;
`;

const CurrentTab = () => {
    const { pathname } = useLocation();
    const { t } = useTranslation();
    const value = pathname.split("/")?.[1];
    const label = t(`routes.${value}`);

    if (`routes.${value}` === label) {
        return null;
    }

    return (
        <Tabs value={pathname}>
            <Tab value={pathname} label={<Body1Typography color="inherit">{label}</Body1Typography>} />
        </Tabs>
    );
};

export default CurrentTab;
