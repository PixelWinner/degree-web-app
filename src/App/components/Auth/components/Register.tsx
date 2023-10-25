import { omit } from "lodash";

import React from "react";
import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { toFormikValidationSchema } from "zod-formik-adapter";

import { authApi } from "@store/apis/auth.api";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import { Field } from "@utils/typings/enums/common.enums";
import { RegisterFormSchema } from "@utils/typings/schemas/auth/auth.schemas";
import { RegisterDto, RegisterForm } from "@utils/typings/types/auth/auth.types";

import { FormContainer } from "@components/Auth/components/FormContainer.styled";
import Button from "@components/Button";
import { Link } from "@components/Link";
import TextField from "@components/TextField";
import { H3Typography } from "@components/Typography";

const Register = () => {
    const { t } = useTranslation();
    const [register, { isLoading }] = authApi.useRegisterMutation();

    const initialValues: RegisterForm = {
        [Field.Name]: "",
        [Field.EMAIL]: "",
        [Field.PASSWORD]: "",
        [Field.REPEAT_PASSWORD]: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: RegisterForm) => {
            const dto: RegisterDto = omit(values, Field.REPEAT_PASSWORD);
            register(dto);
        }
    });

    return (
        <FormContainer onSubmit={formikHook.handleSubmit}>
            <H3Typography>{t("general.register")}</H3Typography>
            <TextField {...getTextFieldProps({ field: Field.Name, formikHook, t })} />
            <TextField {...getTextFieldProps({ field: Field.EMAIL, formikHook, t })} />
            <TextField type="password" {...getTextFieldProps({ field: Field.PASSWORD, formikHook, t })} />
            <TextField type="password" {...getTextFieldProps({ field: Field.REPEAT_PASSWORD, formikHook, t })} />
            <Button type="submit" isLoading={isLoading}>
                {t("general.createAccount")}
            </Button>
            <Link to={PAGE_PATH.login}>{t("general.toLogin")}</Link>
        </FormContainer>
    );
};

export default Register;

const validationSchema = toFormikValidationSchema(RegisterFormSchema);
