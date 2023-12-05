import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FormikErrors, useFormik } from "formik";

import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { TFunction } from "i18next";

import ProductAccordionForm from "@pages/ProductsSupply/ProductForms/components/ProductAccordionForm";

import { CreateProductDtoSchema } from "@utils/typings/schemas/products/products.schemas";
import { CreateProductDto } from "@utils/typings/types/products/products.types";
import { GetStorageShelfListResponse } from "@utils/typings/types/storages/storages.types";

type UseProductsFormsProps = {
    storageShelfList: GetStorageShelfListResponse | undefined;
};

type UseProductsFormsReturns = {
    validate: () => Promise<FormikErrors<InitialValues>>;
    products: CreateProductDto[];
    accordions: JSX.Element[];
    handleAddProduct: () => void;
};

type UseProductsFormsHook = (props: UseProductsFormsProps) => UseProductsFormsReturns;

type InitialValues = { products: CreateProductDto[] };

export const useProductsForms: UseProductsFormsHook = ({ storageShelfList }) => {
    const { t } = useTranslation();
    const initialValues: InitialValues = { products: [] };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: () => {}
    });

    const availableStorage = useMemo(() => storageShelfList?.find((storage) => !!storage?.shelves[0]?.id), [storageShelfList]);

    const handleAddProduct = useCallback(() => {
        if (!availableStorage) {
            return;
        }

        const shelfId = availableStorage.shelves[0].id;
        const order = formikHook.values.products.length + 1;

        formikHook.setFieldValue(`products`, [...formikHook.values.products, getNewProduct({ shelfId, order, t })]);
    }, [availableStorage, formikHook]);

    const accordions = useMemo(
        () => formikHook.values.products.map((product, index) => <ProductAccordionForm key={index} values={product} formikHook={formikHook} index={index} />),
        [formikHook]
    );

    const validate = useCallback(async () => {
        formikHook.handleSubmit();

        return await formikHook.validateForm();
    }, [formikHook]);

    return {
        validate,
        products: formikHook.values.products,
        handleAddProduct,
        accordions
    };
};

type GetNewProductHelper = (props: { shelfId: number; order: number; t: TFunction }) => CreateProductDto;

const getNewProduct: GetNewProductHelper = ({ shelfId, order, t }) => ({
    name: `${t("general.product")} - ${order}`,
    amount: 0,
    pricePerUnit: 0,
    weightPerUnit: 0,
    length: 0,
    width: 0,
    height: 0,
    shelfId,
    properties: []
});

const validationSchema = toFormikValidationSchema(z.object({ products: z.array(CreateProductDtoSchema) }));
