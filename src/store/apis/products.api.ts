import { z } from "zod";

import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { ProductSchema } from "@utils/typings/schemas/products/products.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import { CreateProductDto, DeleteProductDto, Product, UpdateProductDto } from "@utils/typings/types/products/products.types";

const handleTransformGetProductsResponse = (response: Product[]): Product[] => {
    return z.array(ProductSchema).parse(response, { async: false });
};

export const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<Product[], number>({
            query: (shelfId) => ({
                url: API_URLS.products.getAll(shelfId),
                method: HttpMethod.GET
            }),
            providesTags: (_, __, shelfId) => [{ type: ProvidedTag.PRODUCTS, id: shelfId }],
            transformResponse: handleTransformGetProductsResponse
        }),
        createProduct: build.mutation<MessageResponse, CreateProductDto>({
            query: (body) => ({
                url: API_URLS.products.main,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: (_, __, { shelfId }) => [{ type: ProvidedTag.PRODUCTS, id: shelfId }],
            transformResponse: handleTransformMessageResponse
        }),
        updateProduct: build.mutation<MessageResponse, UpdateProductDto>({
            query: (body) => ({
                url: API_URLS.products.main,
                method: HttpMethod.PUT,
                body
            }),
            invalidatesTags: (_, __, { shelfId }) => [{ type: ProvidedTag.PRODUCTS, id: shelfId }],
            transformResponse: handleTransformMessageResponse
        }),
        deleteProduct: build.mutation<MessageResponse, DeleteProductDto>({
            query: ({ id }) => ({
                url: API_URLS.products.main,
                method: HttpMethod.DELETE,
                body: { id }
            }),
            invalidatesTags: (_, __, { shelfId }) => [{ type: ProvidedTag.PRODUCTS, id: shelfId }],
            transformResponse: handleTransformMessageResponse
        })
    })
});
