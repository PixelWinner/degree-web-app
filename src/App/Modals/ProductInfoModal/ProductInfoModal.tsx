import styled from "styled-components";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import MuiCloseIcon from "@mui/icons-material/Close";
import { Divider as MuiDivider } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { getValueWithCurrency, getValueWithSizeUnit, getValueWithVolumeUnit, getValueWithWeightUnit } from "@utils/helpers/getValueWithUnits.helpers";
import { Product } from "@utils/typings/types/products/products.types";

import { Body1Typography, H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

const CloseIcon = styled(MuiCloseIcon)`
    align-self: flex-end;
    cursor: pointer;
`;

const Divider = styled(MuiDivider)`
    width: 100%;
`;

type ProductInfoModalProps = {
    modalHook: ModalHookReturns;
    product: Product;
};

const ProductInfoModal: FC<ProductInfoModalProps> = ({ modalHook, product }) => {
    const { t } = useTranslation();
    const { name, length, width, height, amount, pricePerUnit, weightPerUnit, createdAt, updatedAt } = product;

    const volume = length * width * height;
    const totalVolume = volume * amount;
    const totalWeight = weightPerUnit * amount;

    return (
        <Modal {...modalHook.modalProps}>
            <CloseIcon onClick={modalHook.closeModal} />

            <H5Typography>{t("modal.productInfo.title")}</H5Typography>

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
                {t("general.height")}: {getValueWithSizeUnit(height, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.pricePerUnit")}: {getValueWithCurrency(pricePerUnit, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.volumePerUnit")}: {getValueWithVolumeUnit(volume, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.weightPerUnit")}: {getValueWithWeightUnit(weightPerUnit, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.amount")}: {amount}
            </Body1Typography>

            <Body1Typography>
                {t("general.totalVolume")}: {getValueWithVolumeUnit(totalVolume, t)}
            </Body1Typography>

            <Body1Typography>
                {t("general.totalWeight")}: {getValueWithWeightUnit(totalWeight, t)}
            </Body1Typography>

            <Body1Typography>{t("general.createdAt", { date: format(new Date(createdAt), DATE_TIME_FORMAT.shortDate) })}</Body1Typography>

            <Body1Typography>{t("general.updatedAt", { date: format(new Date(updatedAt), DATE_TIME_FORMAT.shortDate) })}</Body1Typography>
        </Modal>
    );
};

export default ProductInfoModal;
