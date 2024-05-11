import React from "react";
import { H5Typography } from "@components/Typography";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import TextField from "@components/TextField";
import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { ChangePasswordDto } from "@utils/typings/types/auth/auth.types";
import { Field } from "@utils/typings/enums/common.enums";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ChangePasswordFormSchema } from "@utils/typings/schemas/auth/auth.schemas";
import Button from "@components/Button";
import { userDataApi } from "@store/apis/userData.api";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;`;

const ChangePasswordForm = () => {
    const { t } = useTranslation();
    const [changePassword, { isLoading }] = userDataApi.useChangePasswordMutation();

    const initialValues: ChangePasswordDto = {
        [Field.OLD_PASSWORD]: "",
        [Field.NEW_PASSWORD]: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: ChangePasswordDto, formikHelpers) => {
            await changePassword(values).unwrap();
            formikHelpers.resetForm();
        }
    });

    return (
        <Container>
            <H5Typography>{t("general.changePassword")}</H5Typography>

            <Form onSubmit={formikHook.handleSubmit}>
                <TextField  {...getTextFieldProps({ field: Field.OLD_PASSWORD, formikHook, t })} />

                <TextField  {...getTextFieldProps({ field: Field.NEW_PASSWORD, formikHook, t })} />

                <Button type="submit" isLoading={isLoading}>
                    {t("general.confirm")}
                </Button>
            </Form>
        </Container>
    );
};

export default ChangePasswordForm;

const validationSchema = toFormikValidationSchema(ChangePasswordFormSchema);