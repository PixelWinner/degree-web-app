import { baseApi } from "@store/apis/base.api";
import { CreateShipmentDto, GetShipmentProductsQuery, GetShipmentsResponse } from "@utils/typings/types/shipments/shipments.types";
import { API_URLS } from "@utils/constants/api.constants";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";

import { MessageResponse } from "@utils/typings/types/api.types";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";

export const shipmentsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getShipments: build.query<GetShipmentsResponse, GetShipmentProductsQuery>({
            query: (query) => ({
                url: API_URLS.shipments.getAll(query),
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.SHIPMENTS, ProvidedTag.PRODUCTS],
        }),
        createShipment: build.mutation<MessageResponse, CreateShipmentDto>({
            query: (body) => ({
                url: API_URLS.shipments.main,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [ProvidedTag.SHIPMENTS, ProvidedTag.PRODUCTS],
            transformResponse: handleTransformMessageResponse
        })
    })
});
