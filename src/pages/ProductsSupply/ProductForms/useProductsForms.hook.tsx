import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FormikErrors, useFormik } from "formik";

import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { TFunction } from "i18next";

import ProductAccordionForm from "@pages/ProductsSupply/ProductForms/components/ProductAccordionForm";

import { SupplyProductSchema } from "@utils/typings/schemas/supplier/supplier.schema";
import { SupplyProduct } from "@utils/typings/types/supplier/supplier.types";

type UseProductsFormsReturns = {
    validate: () => Promise<FormikErrors<InitialValues>>;
    products: SupplyProduct[];
    accordions: JSX.Element[];
    handleAddProduct: () => void;
};

type UseProductsFormsHook = () => UseProductsFormsReturns;

type InitialValues = { products: SupplyProduct[] };

export const useProductsForms: UseProductsFormsHook = () => {
    const { t } = useTranslation();
    const initialValues: InitialValues = { products: [] };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: () => {}
    });

    const handleAddProduct = useCallback(() => {
        const order = formikHook.values.products.length + 1;

        formikHook.setFieldValue(`products`, [...formikHook.values.products, getNewProduct(order, t)]);
    }, [formikHook]);

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

const getNewProduct = (order: number, t: TFunction): SupplyProduct => ({
    name: `${t("general.product")} - ${order}`,
    amount: 0,
    pricePerUnit: 0,
    weightPerUnit: 0,
    length: 0,
    width: 0,
    height: 0,
    properties: []
});

const validationSchema = toFormikValidationSchema(z.object({ products: z.array(SupplyProductSchema) }));
