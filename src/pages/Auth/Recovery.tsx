import React from "react";
import { useTranslation } from "react-i18next";
import { authApi } from "@store/apis/auth.api";
import { RecoverPasswordDto } from "@utils/typings/types/auth/auth.types";
import { Field } from "@utils/typings/enums/common.enums";
import { useFormik } from "formik";
import { FormContainer } from "@utils/styles/FormContainer.styled";
import { H3Typography } from "@components/Typography";
import TextField from "@components/TextField";
import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";
import Button from "@components/Button";
import { Link } from "@components/Link";
import { PAGE_PATH } from "@utils/constants/common.constants";
import { useNavigate } from "react-router-dom";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { RecoverPasswordDtoSchema } from "@utils/typings/schemas/auth/auth.schemas";

const Recovery = () => {
    const { t } = useTranslation();
    const [recover, { isLoading }] = authApi.useRecoverMutation();
    const navigate = useNavigate();

    const initialValues: RecoverPasswordDto = {
        [Field.EMAIL]: "",
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: RecoverPasswordDto) => {
          await recover(values).unwrap();

          navigate(PAGE_PATH.reset)
        }
    });

    return (
        <FormContainer onSubmit={formikHook.handleSubmit}>
            <H3Typography>{t("general.passwordRecovery")}</H3Typography>
            <TextField {...getTextFieldProps({ field: Field.EMAIL, formikHook, t })} />

            <Button type="submit" isLoading={isLoading}>
                {t("general.confirm")}
            </Button>

            <Link to={PAGE_PATH.login}>{t("general.toLogin")}</Link>
        </FormContainer>
    );
};

export default Recovery;

const validationSchema = toFormikValidationSchema(RecoverPasswordDtoSchema);