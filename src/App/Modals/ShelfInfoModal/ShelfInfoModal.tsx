import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import styled from "styled-components/macro";

import MuiCloseIcon from "@mui/icons-material/Close";
import { Divider as MuiDivider } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { getValueWithSizeUnit, getValueWithVolumeUnit, getValueWithWeightUnit } from "@utils/helpers/getValueWithUnits.helpers";
import { Shelf } from "@utils/typings/types/shelves/shelves.types";

import { Body1Typography, H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

const CloseIcon = styled(MuiCloseIcon)`
    align-self: flex-end;
    cursor: pointer;
`;

const StyledModal = styled(Modal)`
    text-align: center;
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

    console.log(shelf);
    return (
        <StyledModal {...modalHook.modalProps}>
            <CloseIcon onClick={modalHook.closeModal} />

            <H5Typography>{t("modal.shelfInfo.title")}</H5Typography>

            <Divider />

            <Body1Typography>
                {t("general.name")}: {name}
            </Body1Typography>

            <Body1Typography>
                {t("general.length")}: {getValueWithSizeUnit(length, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.width")}: {getValueWithSizeUnit(width, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.width")}: {getValueWithSizeUnit(height, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.maxWeight")}: {getValueWithWeightUnit(maxWeight, t)}
            </Body1Typography>

            <Body1Typography>{t("general.availableWeight", { availableWeight })}</Body1Typography>

            <Body1Typography>
                {t("general.maxVolume")}: {getValueWithVolumeUnit(maxVolume, t)}
            </Body1Typography>

            <Body1Typography>{t("general.availableVolume", { availableVolume })}</Body1Typography>

            <Body1Typography>{t("general.createdAt", { date: format(new Date(createdAt), DATE_TIME_FORMAT.shortDate) })}</Body1Typography>
            <Body1Typography>{t("general.updatedAt", { date: format(new Date(updatedAt), DATE_TIME_FORMAT.shortDate) })}</Body1Typography>
        </StyledModal>
    );
};

export default ShelfInfoModal;
