import React, { FC } from "react";
import { GetShipmentsResponse } from "@utils/typings/types/shipments/shipments.types";
import styled from "styled-components";
import { Box, Paper } from "@mui/material";
import { H4Typography } from "@components/Typography";
import { useTranslation } from "react-i18next";
import ShipmentItem from "@pages/ShipmentsStatistic/components/ShipmentsList/components/ShipmentItem";

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
    overflow: auto
`;

const Wrapper = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
    padding: 16px;

`;


type ShipmentsListProps = {
    shipments: GetShipmentsResponse
}

const ShipmentsList: FC<ShipmentsListProps> = ({ shipments }) => {
    const { t } = useTranslation();

    const shipmentsList = shipments.map((shipment) => <ShipmentItem key={shipment.id} {...shipment} />);

    if (!shipments.length) {
        return null;
    }

    return (
        <Container >
            <H4Typography>{t("general.shipmentsList")}</H4Typography>

            <Wrapper>
                {shipmentsList}
            </Wrapper>
        </Container>
    );
};

export default ShipmentsList;


