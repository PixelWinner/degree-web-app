import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import ProductCard from "@pages/Products/components/ProductCard";

import { productsApi } from "@store/apis/products.api";

import { CardsContainerStyled } from "@utils/styles/Cards.styled";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";

import CreateProductModal from "../../App/Modals/CreateProductModal/CreateProductModal";
import { useModal } from "../../App/Modals/Modal/useModal.hook";

const Products = () => {
    const modalHook = useModal();
    const { shelfId = "" } = useParams();
    const { t } = useTranslation();
    const { data, isLoading, isError } = productsApi.useGetProductsQuery(+shelfId, { skip: !shelfId });

    if (isLoading || isError || !data) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    const toolBarButtons = (
        <>
            <BackButton />
            <Button onClick={modalHook.openModal}>{t("general.addProduct")}</Button>
        </>
    );

    const products = data.map((product) => <ProductCard key={product.id} {...product} />);

    return (
        <>
            <ToolBar leftPart={toolBarButtons} />
            <CardsContainerStyled>{products}</CardsContainerStyled>
            <CreateProductModal modalHook={modalHook} shelfId={+shelfId} />
        </>
    );
};

export default Products;
