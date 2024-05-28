import React, { FC } from "react";
import styled from "styled-components/macro";
import { Box, Paper } from "@mui/material";
import { H5Typography } from "@components/Typography";
import { useTranslation } from "react-i18next";
import { FormikValues } from "formik";
import MuiAddIcon from "@mui/icons-material/PlaylistAdd";
import { useModal } from "../../../../App/Modals/Modal/useModal.hook";
import ShipmentProductSearchModal from "../../../../App/Modals/ShipmentProductSearchModal/ShipmentProductSearchModal";
import { ShippedProduct } from "@utils/typings/types/shipments/shipments.types";
import ProductItem from "@pages/ProductsShipment/components/ProductsList/components/ProductItem";

type ProductsListProps = {
    formikHook: FormikValues
}

const AddIcon = styled(MuiAddIcon)`
    align-self: flex-end;
    cursor: pointer;
`;

const Header = styled(Box)`
    display: flex;
    width: 100%;
    gap: 16px;
    align-items: center;
    justify-content: space-between`;

const Container = styled(Paper)`
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
    min-width: 300px;
    overflow: hidden;
    align-items: start;
`;

const Wrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    flex-direction: row;
    gap: 8px;
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    overflow: auto;

`;

const ProductsList: FC<ProductsListProps> = ({ formikHook }) => {
    const { t } = useTranslation();
    const modalHook = useModal();

    const productsList = formikHook.values.products.map((product: ShippedProduct, index: number) => <ProductItem key={product.id} formikHook={formikHook}
                                                                                                                 index={index} product={product} />);

    return (
        <Container>
            <Header>
                <H5Typography>{t("general.productsList")}</H5Typography>
                <AddIcon fontSize="large" color="primary" onClick={modalHook.openModal} />
            </Header>

            <Wrapper>
                {productsList}
            </Wrapper>

            <ShipmentProductSearchModal modalHook={modalHook} formikHook={formikHook} />
        </Container>
    );
};

export default ProductsList;