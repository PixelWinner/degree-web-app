import { baseApi } from "@store/apis/base.api";
import { CreateShipmentDto, GetShipmentProductsQuery } from "@utils/typings/types/shipments/shipments.types";
import { API_URLS } from "@utils/constants/api.constants";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { GetProductsResponse } from "@utils/typings/types/products/products.types";
import { GetProductsResponseSchema } from "@utils/typings/schemas/products/products.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";

const handleTransformGetShipmentsResponse = (response: GetProductsResponse): GetProductsResponse => {
    return GetProductsResponseSchema.parse(response, { async: false });
};

export const shipmentsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getShipments: build.query<GetProductsResponse, GetShipmentProductsQuery>({
            query: (query) => ({
                url: API_URLS.shipments.getAll(query),
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.SHIPMENTS, ProvidedTag.PRODUCTS],
            transformResponse: handleTransformGetShipmentsResponse
        }),
        createShipment: build.mutation<MessageResponse, CreateShipmentDto>({
            query: (body) => ({
                url: API_URLS.shipments.main,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [ProvidedTag.PRODUCTS, ProvidedTag.SHIPMENTS],
            transformResponse: handleTransformMessageResponse
        })
    })
});
