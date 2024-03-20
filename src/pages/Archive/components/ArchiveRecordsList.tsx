import styled from "styled-components";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Paper } from "@mui/material";

import { productsApi } from "@store/apis/products.api";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { ArchiveRecord } from "@utils/typings/types/products/products.types";

import { Body2Typography } from "@components/Typography";

import ConfirmModal from "../../../App/Modals/ConfirmModal/ConfirmModal";
import { useModal } from "../../../App/Modals/Modal/useModal.hook";

const Icon = styled(DeleteIcon)`
    cursor: pointer;
`;

const Container = styled(Paper)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    gap: 8px;
    min-width: 170px;
`;

const Details = styled(Box)`
    display: flex;
    flex-wrap: nowrap;
    gap: 4px;
`;

type ArchiveRecordsListProps = {
    record: ArchiveRecord;
    productId: number;
};

const ArchiveRecordsList: FC<ArchiveRecordsListProps> = ({ record, productId }) => {
    const { t } = useTranslation();
    const modalHook = useModal();
    const [deleteArchiveRecord] = productsApi.useDeleteArchiveRecordMutation();

    const handleDeleteRecord = async () => {
        return await deleteArchiveRecord({ ...record, productId }).unwrap();
    };

    return (
        <Container elevation={3} key={record.date}>
            <Box>
                <Details>
                    <Body2Typography fontWeight="bolder">{t("general.createdAt")}:</Body2Typography>
                    <Body2Typography>{format(new Date(record.date), DATE_TIME_FORMAT.shortDate)}</Body2Typography>
                </Details>

                <Details>
                    <Body2Typography fontWeight="bolder">{t("general.reason")}:</Body2Typography>
                    <Body2Typography>{record.reason}</Body2Typography>
                </Details>

                <Details>
                    <Body2Typography fontWeight="bolder">{t("general.amount")}:</Body2Typography>
                    <Body2Typography>{record.amount}</Body2Typography>
                </Details>
            </Box>

            <Icon color="primary" onClick={modalHook.openModal} />

            <ConfirmModal modalHook={modalHook} titleTranslationKey={"modal.deleteFromArchive.title"} onConfirm={handleDeleteRecord} />
        </Container>
    );
};

export default ArchiveRecordsList;
