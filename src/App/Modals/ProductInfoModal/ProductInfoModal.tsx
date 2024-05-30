import styled from "styled-components";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { format } from "date-fns";

import MuiCloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails as MuiAccordionDetails, AccordionSummary, Box, Divider as MuiDivider, Paper } from "@mui/material";

import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";
import { calculateVolume } from "@utils/helpers/calculateVolume.helper";
import { getValueWithCurrency, getValueWithSizeUnit, getValueWithVolumeUnit, getValueWithWeightUnit } from "@utils/helpers/getValueWithUnits.helpers";
import { Product } from "@utils/typings/types/products/products.types";

import InfoTypography from "@components/InfoTypography";
import { H5Typography, H6Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";


const CloseIcon = styled(MuiCloseIcon)`
    align-self: flex-end;
    cursor: pointer;
`;

const Divider = styled(MuiDivider)`
    width: 100%;
`;

const AccordionsContainer = styled(Box)`
    display: flex;
    flex-direction: column;

    & h6 {
        text-align: start;
    }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
    border: ${({ theme }) => `${theme.palette.divider} 1px solid`};
    border-top: none;
`;

type ProductInfoModalProps = {
    modalHook: ModalHookReturns;
    product: Product;
};

const ProductInfoModal: FC<ProductInfoModalProps> = ({ modalHook, product }) => {
    const { t } = useTranslation();
    const { name, length, width, height, amount, pricePerUnit, weightPerUnit, createdAt, updatedAt, properties, supplier, initialAmount, shipments } = product;

    const volume = calculateVolume({ length, width, height });
    const totalVolume = calculateVolume({ length, width, height, amount });
    const totalPrice = pricePerUnit * amount;
    const totalWeight = weightPerUnit * amount;
    const propertyValues = properties.map(({ label, value }, index) => <InfoTypography key={index} label={label} value={value} />);

    return (
        <Modal {...modalHook.modalProps}>
            <CloseIcon onClick={modalHook.closeModal} />

            <H5Typography>{t("modal.productInfo.title")}</H5Typography>

            <Divider />

            <InfoTypography label={t("general.name")} value={name} />

            <InfoTypography label={t("general.length")} value={getValueWithSizeUnit(length, t)} />

            <InfoTypography label={t("general.width")} value={getValueWithSizeUnit(width, t)} />

            <InfoTypography label={t("general.height")} value={getValueWithSizeUnit(height, t)} />

            <InfoTypography label={t("general.name")} value={name} />

            <InfoTypography label={t("general.pricePerUnit")} value={getValueWithCurrency(pricePerUnit, t)} />

            <InfoTypography label={t("general.volumePerUnit")} value={getValueWithVolumeUnit(volume, t)} />

            <InfoTypography label={t("general.weightPerUnit")} value={getValueWithWeightUnit(weightPerUnit, t)} />

            <InfoTypography label={t("general.amount")} value={amount} />

            <InfoTypography label={t("general.initialAmount")} value={initialAmount} />

            <InfoTypography label={t("general.totalPrice")} value={getValueWithCurrency(totalPrice, t)} />

            <InfoTypography label={t("general.totalVolume")} value={getValueWithVolumeUnit(totalVolume, t)} />

            <InfoTypography label={t("general.totalWeight")} value={getValueWithWeightUnit(totalWeight, t)} />

            <InfoTypography label={t("general.shipmentsAmount")} value={shipments.length}/>

            <InfoTypography label={t("general.createdAt")} value={format(new Date(createdAt), DATE_TIME_FORMAT.fullDate)} />

            <InfoTypography label={t("general.updatedAt")} value={format(new Date(updatedAt), DATE_TIME_FORMAT.fullDate)} />

            <AccordionsContainer>
                {!!propertyValues.length && (
                    <Accordion>
                        <AccordionSummary component={Paper} elevation={1} expandIcon={<ExpandMoreIcon />}>
                            <H6Typography>{t("general.additionalParameters")}</H6Typography>
                        </AccordionSummary>

                        <AccordionDetails>{propertyValues}</AccordionDetails>
                    </Accordion>
                )}

                <Accordion>
                    <AccordionSummary component={Paper} elevation={1} expandIcon={<ExpandMoreIcon />}>
                        <H6Typography>{t("general.supplierInfo")}</H6Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <InfoTypography label={t("general.fullCompanyName")} value={supplier.fullCompanyName} />

                        <InfoTypography label={t("general.legalAddress")} value={supplier.legalAddress} />

                        <InfoTypography label={t("general.TIN")} value={supplier.TIN} />

                        <InfoTypography label={t("general.USREOU")} value={supplier.USREOU} />

                        <InfoTypography label={t("general.email")} value={supplier.email} />

                        <InfoTypography label={t("general.phoneNumber")} value={supplier.phoneNumber} />
                    </AccordionDetails>
                </Accordion>
            </AccordionsContainer>
        </Modal>
    );
};

export default ProductInfoModal;
