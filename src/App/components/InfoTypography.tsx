import React, { FC } from "react";

import styled from "styled-components/macro";

import { Box, BoxProps } from "@mui/material";

import { Body1Typography } from "@components/Typography";

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
`;

type InfoTypographyProps = {
    label: string;
    value: string | number;
} & BoxProps;
const InfoTypography: FC<InfoTypographyProps> = ({ label, value, ...rest }) => {
    return (
        <Container {...rest}>
            <Body1Typography fontWeight="bold">{label}:</Body1Typography>
            <Body1Typography>{value}</Body1Typography>
        </Container>
    );
};

export default InfoTypography;
