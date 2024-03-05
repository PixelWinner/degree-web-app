import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { H6Typography } from "@components/Typography";

const Typography = styled(H6Typography)`
    margin: auto;
    text-align: center;
`;

const NoDataMessage = () => {
    const { t } = useTranslation();

    return <Typography>{t("general.noData")}</Typography>;
};

export default NoDataMessage;
