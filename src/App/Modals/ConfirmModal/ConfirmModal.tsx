import styled from "styled-components";

import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";

import Button from "@components/Button";
import { H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

const ButtonsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    width: 100%;
`;

type ConfirmModalProps = {
    modalHook: ModalHookReturns;
    titleTranslationKey: string;
    titleTranslationValues?: { [key in string]: string };
    onConfirm: () => Promise<unknown>;
    onCancel?: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = ({ modalHook, titleTranslationKey, titleTranslationValues, onConfirm, onCancel }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleCancel = () => {
        onCancel?.();
        modalHook.closeModal();
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        await onConfirm();
        setIsLoading(false);
        modalHook.closeModal();
    };

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t(titleTranslationKey, titleTranslationValues)}</H5Typography>

            <ButtonsContainer>
                <Button onClick={handleCancel} variant="outlined">
                    {t("general.cancel")}
                </Button>
                <Button isLoading={isLoading} onClick={handleConfirm}>
                    {t("general.confirm")}
                </Button>
            </ButtonsContainer>
        </Modal>
    );
};

export default ConfirmModal;
