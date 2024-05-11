import React from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { authApi } from "@store/apis/auth.api";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { FormContainer } from "@utils/styles/FormContainer.styled";
import { Field } from "@utils/typings/enums/common.enums";
import { LoginDtoSchema } from "@utils/typings/schemas/auth/auth.schemas";
import { LoginDto } from "@utils/typings/types/auth/auth.types";

import Button from "@components/Button";
import { Link } from "@components/Link";
import TextField from "@components/TextField";
import { H3Typography } from "@components/Typography";

const Login = () => {
    const { t } = useTranslation();
    const [login, { isLoading }] = authApi.useLoginMutation();

    const initialValues: LoginDto = {
        [Field.EMAIL]: "",
        [Field.PASSWORD]: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: LoginDto) => {
            login(values);
        }
    });

    return (
        <FormContainer onSubmit={formikHook.handleSubmit}>
            <H3Typography>{t("general.login")}</H3Typography>

            <TextField {...getTextFieldProps({ field: Field.EMAIL, formikHook, t })} />

            <TextField {...getTextFieldProps({ field: Field.PASSWORD, formikHook, t })} />

            <Button type="submit" isLoading={isLoading}>
                {t("general.signIn")}
            </Button>

            <Link to={PAGE_PATH.register}>{t("general.toRegister")}</Link>

            <Link to={PAGE_PATH.recovery}>{t("general.forgotPassword")}</Link>
        </FormContainer>
    );
};

export default Login;

const validationSchema = toFormikValidationSchema(LoginDtoSchema);
