import { z } from "zod";

import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { ProductSchema } from "@utils/typings/schemas/products/products.schemas";
import { Product } from "@utils/typings/types/products/products.types";

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
        })
    })
});
