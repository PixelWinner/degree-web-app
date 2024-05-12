import React from "react";
import { useTranslation } from "react-i18next";
import { authApi } from "@store/apis/auth.api";
import { ResetPasswordDto } from "@utils/typings/types/auth/auth.types";
import { Field } from "@utils/typings/enums/common.enums";
import { useFormik } from "formik";
import { FormContainer } from "@utils/styles/FormContainer.styled";
import { H3Typography } from "@components/Typography";
import TextField from "@components/TextField";
import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import Button from "@components/Button";
import { Link } from "@components/Link";
import { PAGE_PATH } from "@utils/constants/common.constants";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ResetPasswordDtoSchema } from "@utils/typings/schemas/auth/auth.schemas";
import { useNavigate, useParams } from "react-router-dom";

const Reset = () => {
    const { t } = useTranslation();
    const [reset, { isLoading }] = authApi.useResetMutation();
    const navigate = useNavigate();
    const { email } = useParams();

    const initialValues: ResetPasswordDto = {
        [Field.EMAIL]: email ?? "",
        [Field.RECOVERY_CODE]: "",
        [Field.NEW_PASSWORD]: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: ResetPasswordDto) => {
            await reset(values).unwrap();

            navigate(PAGE_PATH.login);
        }
    });

    return (
        <FormContainer onSubmit={formikHook.handleSubmit}>
            <H3Typography>{t("general.passwordRecovery")}</H3Typography>

            <TextField {...getTextFieldProps({ field: Field.EMAIL, formikHook, t })} />

            <TextField {...getTextFieldProps({ field: Field.RECOVERY_CODE, formikHook, t })} />

            <TextField {...getTextFieldProps({ field: Field.NEW_PASSWORD, formikHook, t })} />

            <Button type="submit" isLoading={isLoading}>
                {t("general.confirm")}
            </Button>

            <Link to={PAGE_PATH.login}>{t("general.toLogin")}</Link>
        </FormContainer>
    );
};

export default Reset;

const validationSchema = toFormikValidationSchema(ResetPasswordDtoSchema);