import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { productsApi } from "@store/apis/products.api";

import { CardsContainer } from "@utils/styles/CardsContainer";

import BackButton from "@components/BackButton";
import Button from "@components/Button";
import { SelfCenterLoader } from "@components/SelfCenterLoader";
import ToolBar from "@components/ToolBar";
import { Body1Typography } from "@components/Typography";

const Products = () => {
    const { shelfId = "" } = useParams();
    const { t } = useTranslation();
    const { data, isLoading, isError } = productsApi.useGetProductsQuery(+shelfId, { skip: !shelfId });

    if (isLoading || isError || !data) {
        return <SelfCenterLoader isLoading={isLoading} isError={isError} />;
    }

    const toolBarButtons = (
        <>
            <BackButton />
            <Button>{t("general.addProduct")}</Button>
        </>
    );

    return (
        <>
            <ToolBar leftPart={toolBarButtons} />
            <CardsContainer>
                <Body1Typography>{JSON.stringify(data)}</Body1Typography>
            </CardsContainer>
        </>
    );
};

export default Products;
