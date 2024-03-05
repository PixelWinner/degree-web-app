import { z } from "zod";

import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { ProductSchema } from "@utils/typings/schemas/products/products.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import { Product } from "@utils/typings/types/products/products.types";
import { CreateSupplyDto, GetStatisticsDto } from "@utils/typings/types/supplier/supplier.types";

const handleTransformGetStatisticsResponse = (response: Product[]): Product[] => {
    return z.array(ProductSchema).parse(response, { async: false });
};

export const suppliersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSupply: build.mutation<MessageResponse, CreateSupplyDto>({
            query: (body) => ({
                url: API_URLS.suppliers.main,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [ProvidedTag.SUPPLIERS],
            transformResponse: handleTransformMessageResponse
        }),
        getStatistics: build.query<Product[], GetStatisticsDto>({
            query: (body) => ({
                url: API_URLS.suppliers.getStatistics(body),
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.SUPPLIERS, ProvidedTag.PRODUCTS],
            transformResponse: handleTransformGetStatisticsResponse
        })
    })
});
