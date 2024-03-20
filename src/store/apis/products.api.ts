import { z } from "zod";

import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { ExtendedSearchProductSchema, GetProductsResponseSchema } from "@utils/typings/schemas/products/products.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import {
    AddToArchiveDto,
    CreateProductDto,
    DeleteArchiveRecordDto,
    DeleteProductDto,
    ExtendedSearchProduct,
    GetArchivedProductsQuery,
    GetProductsQuery,
    GetProductsResponse,
    UpdateProductDto
} from "@utils/typings/types/products/products.types";

const handleTransformGetProductsResponse = (response: GetProductsResponse): GetProductsResponse => {
    return GetProductsResponseSchema.parse(response, { async: false });
};

const handleTransformSearchProductResponse = (response: ExtendedSearchProduct[]): ExtendedSearchProduct[] => {
    return z.array(ExtendedSearchProductSchema).parse(response, { async: false });
};

export const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<GetProductsResponse, GetProductsQuery>({
            query: (query) => ({
                url: API_URLS.products.getAll(query),
                method: HttpMethod.GET
            }),
            providesTags: (_, __, { shelfId }) => [{ type: ProvidedTag.PRODUCTS, id: shelfId }],
            transformResponse: handleTransformGetProductsResponse
        }),
        getArchivedProducts: build.query<GetProductsResponse, GetArchivedProductsQuery>({
            query: (query) => ({
                url: API_URLS.products.getArchived(query),
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.ARCHIVE],
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
            invalidatesTags: (_, __, { shelfId }) => [{ type: ProvidedTag.PRODUCTS, id: shelfId }, ProvidedTag.ARCHIVE],
            transformResponse: handleTransformMessageResponse
        }),
        deleteProduct: build.mutation<MessageResponse, DeleteProductDto>({
            query: ({ id }) => ({
                url: API_URLS.products.main,
                method: HttpMethod.DELETE,
                body: { id }
            }),
            invalidatesTags: (_, __, { shelfId }) => [{ type: ProvidedTag.PRODUCTS, id: shelfId }, ProvidedTag.ARCHIVE],
            transformResponse: handleTransformMessageResponse
        }),
        searchProduct: build.query<ExtendedSearchProduct[], string>({
            query: (name) => ({
                url: API_URLS.products.search(name),
                method: HttpMethod.GET
            }),
            transformResponse: handleTransformSearchProductResponse
        }),
        addToArchive: build.mutation<MessageResponse, AddToArchiveDto>({
            query: (body) => ({
                url: API_URLS.products.archive,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [ProvidedTag.PRODUCTS, ProvidedTag.ARCHIVE],
            transformResponse: handleTransformMessageResponse
        }),
        deleteArchiveRecord: build.mutation<MessageResponse, DeleteArchiveRecordDto>({
            query: (body) => ({
                url: API_URLS.products.archive,
                method: HttpMethod.DELETE,
                body
            }),
            invalidatesTags: [ProvidedTag.PRODUCTS, ProvidedTag.ARCHIVE],
            transformResponse: handleTransformMessageResponse
        })
    })
});
