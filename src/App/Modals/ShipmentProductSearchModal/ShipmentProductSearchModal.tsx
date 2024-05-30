import React, { FC, useState } from "react";
import { ModalHookReturns } from "../modal.types";
import { Modal } from "../Modal/Modal";
import { H6Typography, H5Typography } from "@components/Typography";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { productsApi } from "@store/apis/products.api";
import { Request } from "@utils/typings/enums/common.enums";
import SearchField from "@components/SearchField";
import { Box } from "@mui/material";
import ProductItem from "./components/ProductItem";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import Button from "@components/Button";
import { ExtendedSearchProduct } from "@utils/typings/types/products/products.types";
import AddedProductItem from "./components/AddedProductItem";
import { FormikValues } from "formik";
import { ShippedProduct } from "@utils/typings/types/shipments/shipments.types";


const ButtonsContainer = styled(Box)`
    display: flex;
    gap: 16px;
    margin: 16px 0 0 0;
    align-self: end;`;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 16px`;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 8px;
    min-height: 48px;
    width: 100%;
    max-height: 216px;
    overflow-y: auto;
    padding: 8px;
    border: ${({ theme }) => `${theme.palette.divider} 1px solid`};
    border-radius: 4px;
`;

type ShipmentProductSearchModalProps = {
    modalHook: ModalHookReturns;
    formikHook: FormikValues
}

const ShipmentProductSearchModal: FC<ShipmentProductSearchModalProps> = ({ modalHook, formikHook }) => {
    const { t } = useTranslation();
    const [addedProducts, setAddedProducts] = useState<ExtendedSearchProduct[] | ShippedProduct[]>(formikHook.values.products);
    const [queryTrigger, { data, isFetching }] = productsApi.useLazySearchProductQuery();

    const searchResult = data?.map((product) => {
        const isAdded = !!addedProducts.find((addedProduct) => addedProduct.id === product.id);

        if (isAdded) {
            return;
        }

        return <ProductItem key={product.id} setAddedProducts={setAddedProducts} product={product} />;
    });

    const addedProductsList = addedProducts.map((product) => <AddedProductItem key={product.id} setAddedProducts={setAddedProducts} product={product} />);

    const handleConfirm = () => {
        const shippedProducts = addedProducts.map((product) => ({ shippedAmount: 0, ...product }));

        formikHook.setFieldValue("products", shippedProducts);

        modalHook.closeModal()
    };

    return (
        <Modal {...modalHook.modalProps}>
            <Container>
                <H5Typography>{t("modal.shipmentProductSearch.title")}</H5Typography>

                <SearchField
                    labelTranslationKey="routes.productsSearch"
                    requestType={Request.MUTATION}
                    queryTrigger={queryTrigger}
                />

                <H6Typography>{t("general.searchResults")}</H6Typography>

                <Wrapper>
                    {isFetching ? <SelfCenterLoader isLoading={isFetching} /> : searchResult}
                </Wrapper>

                <H6Typography>{t("general.addedProducts")}</H6Typography>

                <Wrapper>
                    {addedProductsList}
                </Wrapper>

            </Container>

            <ButtonsContainer>
                <Button variant="outlined" onClick={modalHook.closeModal}>{t("general.cancel")}</Button>

                <Button onClick={handleConfirm}>{t("general.confirm")}</Button>
            </ButtonsContainer>
        </Modal>
    );
};

export default ShipmentProductSearchModal;