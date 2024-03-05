import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import styled from "styled-components/macro";

import MuiCloseIcon from "@mui/icons-material/Close";
import { Divider as MuiDivider } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { getValueWithSizeUnit, getValueWithVolumeUnit, getValueWithWeightUnit } from "@utils/helpers/getValueWithUnits.helpers";
import { Shelf } from "@utils/typings/types/shelves/shelves.types";

import InfoTypography from "@components/InfoTypography";
import { H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

const CloseIcon = styled(MuiCloseIcon)`
    align-self: flex-end;
    cursor: pointer;
`;

const Divider = styled(MuiDivider)`
    width: 100%;
`;

type ShelfInfoModalProps = {
    modalHook: ModalHookReturns;
    shelf: Shelf;
};

const ShelfInfoModal: FC<ShelfInfoModalProps> = ({ modalHook, shelf }) => {
    const { t } = useTranslation();
    const { name, length, width, height, maxWeight, availableWeight, maxVolume, availableVolume, createdAt, updatedAt } = shelf;

    return (
        <Modal {...modalHook.modalProps}>
            <CloseIcon onClick={modalHook.closeModal} />

            <H5Typography>{t("modal.shelfInfo.title")}</H5Typography>

            <Divider />

            <InfoTypography label={t("general.name")} value={name} />

            <InfoTypography label={t("general.length")} value={getValueWithSizeUnit(length, t)} />

            <InfoTypography label={t("general.width")} value={getValueWithSizeUnit(width, t)} />

            <InfoTypography label={t("general.height")} value={getValueWithSizeUnit(height, t)} />

            <InfoTypography label={t("general.maxWeight")} value={getValueWithWeightUnit(maxWeight, t)} />

            <InfoTypography label={t("general.availableWeight")} value={getValueWithWeightUnit(availableWeight, t)} />

            <InfoTypography label={t("general.maxVolume")} value={getValueWithVolumeUnit(maxVolume, t)} />

            <InfoTypography label={t("general.availableVolume")} value={getValueWithVolumeUnit(availableVolume, t)} />

            <InfoTypography label={t("general.createdAt")} value={format(new Date(createdAt), DATE_TIME_FORMAT.fullDate)} />

            <InfoTypography label={t("general.updatedAt")} value={format(new Date(updatedAt), DATE_TIME_FORMAT.fullDate)} />
        </Modal>
    );
};

export default ShelfInfoModal;
