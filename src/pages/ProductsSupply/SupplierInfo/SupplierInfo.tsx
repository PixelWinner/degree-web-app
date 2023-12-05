import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components/macro";

import { Paper } from "@mui/material";

import { H5Typography } from "@components/Typography";

const Container = styled(Paper)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    max-width: max-content;
    gap: 8px;
    padding: 8px 16px;
`;

const HeaderTypography = styled(H5Typography)`
    width: 100%;
`;

type SupplierInfoProps = {
    textFields: JSX.Element[];
};

const SupplierInfo: FC<SupplierInfoProps> = ({ textFields }) => {
    const { t } = useTranslation();

    return (
        <Container>
            <HeaderTypography>{t("general.supplierInfo")}</HeaderTypography>

            {textFields}
        </Container>
    );
};

export default SupplierInfo;
