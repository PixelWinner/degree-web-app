import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import styled from "styled-components/macro";

import { Box } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { TStorage } from "@utils/typings/types/storages/storages.types";

import { Body1Typography, H5Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

type StorageInfoProps = {
    storage: TStorage;
};

const StorageInfo: FC<StorageInfoProps> = ({ storage }) => {
    const { t } = useTranslation();

    return (
        <Container>
            <H5Typography fontWeight="bold">{t("general.storageInfo")}</H5Typography>

            <Body1Typography>
                {t("general.name")}: {storage.name}
            </Body1Typography>

            <Body1Typography>
                {t("general.address")}: {storage.address}
            </Body1Typography>

            <Body1Typography>{t("general.createdAt", { date: format(new Date(storage.createdAt), DATE_TIME_FORMAT.shortDate) })}</Body1Typography>

            <Body1Typography>{t("general.updatedAt", { date: format(new Date(storage.updatedAt), DATE_TIME_FORMAT.shortDate) })}</Body1Typography>
        </Container>
    );
};

export default StorageInfo;
