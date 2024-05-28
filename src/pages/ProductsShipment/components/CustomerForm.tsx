import React, { FC } from "react";
import { Paper } from "@mui/material";
import TextField from "@components/TextField";
import styled from "styled-components/macro";
import { H4Typography } from "@components/Typography";
import { useTranslation } from "react-i18next";
import { FormikValues } from "formik";
import { Field } from "@utils/typings/enums/common.enums";
import { getTextFieldProps } from "@utils/helpers/getTextFieldProps.helper";

const Container = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;`;

type CustomerFormProps ={
    formikHook:FormikValues
}

const CustomerForm:FC<CustomerFormProps> = ({formikHook}) => {
    const { t } = useTranslation();

    return (
        <Container>
            <H4Typography>{t("general.customerInfo")}</H4Typography>

            <Form>
                <TextField {...getTextFieldProps({formikHook, t, field:Field.Name})}/>
                <TextField {...getTextFieldProps({formikHook, t, field:Field.SURNAME})}/>
                <TextField {...getTextFieldProps({formikHook, t, field:Field.PATRONYMIC})}/>
                <TextField {...getTextFieldProps({formikHook, t, field:Field.EMAIL})}/>
                <TextField {...getTextFieldProps({formikHook, t, field:Field.PHONE_NUMBER})}/>
                <TextField {...getTextFieldProps({formikHook, t, field:Field.ADDRESS})}/>
            </Form>
        </Container>
    );
};

export default CustomerForm;