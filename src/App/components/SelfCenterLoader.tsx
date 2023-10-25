import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Box, CircularProgress } from "@mui/material";

import { H5Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 16px;
    flex: 1;
`;

type SelfCenterLoaderProps = {
    isLoading: boolean;
    isError?: boolean;
};

export const SelfCenterLoader: FC<SelfCenterLoaderProps> = ({ isLoading, isError }) => {
    const { t } = useTranslation();

    if (isError) {
        return (
            <Container>
                <H5Typography>{t("general.somethingWrong")}</H5Typography>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container>
                <CircularProgress color="primary" />
            </Container>
        );
    }
};
