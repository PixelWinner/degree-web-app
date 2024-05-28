import React, { FC, useId } from "react";
import { Trans, useTranslation } from "react-i18next";

import { FormikValues } from "formik";

import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { ModalButtonsContainer } from "@utils/styles/ModalButtonsConatiner.styled";
import { ModalForm } from "@utils/styles/ModalForm.styled";
import { Field } from "@utils/typings/enums/common.enums";

import Button from "@components/Button";
import TextField from "@components/TextField";
import { Body2Typography, H5Typography } from "@components/Typography";

import { Modal } from "../Modal/Modal";
import { ModalHookReturns } from "../modal.types";

type CreateModalProps = {
    modalHook: ModalHookReturns;
    titleTranslationKey: string;
    descriptionTranslationKey: string;
    formikHook: FormikValues;
    fields: Field[];
    isLoading: boolean;
    titleTranslationValues?: { [key in string]: string };
};

const CreateModal: FC<CreateModalProps> = ({
                                               modalHook,
                                               titleTranslationKey,
                                               titleTranslationValues,
                                               descriptionTranslationKey,
                                               formikHook,
                                               fields,
                                               isLoading
                                           }) => {
    const { t } = useTranslation();
    const formId = useId();

    const textFields = fields.map((field) => <TextField key={field} fullWidth {...getTextFieldProps({ t, formikHook, field })} />);

    return (
        <Modal {...modalHook.modalProps}>
            <H5Typography>{t(titleTranslationKey, titleTranslationValues)}</H5Typography>

            <Body2Typography align="left" color="text.secondary">
                <Trans
                    t={t}
                    i18nKey={descriptionTranslationKey}
                    components={{
                        br: <br />
                    }}
                />
            </Body2Typography>

            <ModalForm id={formId} onSubmit={formikHook.handleSubmit} onReset={formikHook.handleReset}>
                {textFields}
            </ModalForm>

            <ModalButtonsContainer>
                <Button variant="outlined" form={formId} type="reset">
                    {t("general.cancel")}
                </Button>
                <Button isLoading={isLoading} form={formId} type="submit">
                    {t("general.confirm")}
                </Button>
            </ModalButtonsContainer>
        </Modal>
    );
};

export default CreateModal;
