import { z } from "zod";

import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { ShelfSchema } from "@utils/typings/schemas/shelves/shelves.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import { CreateShelfDto, DeleteShelfDto, UpdateShelfDto, UserShelf } from "@utils/typings/types/shelves/shelves.types";

const handleTransformGetShelvesResponse = (response: UserShelf[]): UserShelf[] => {
    return z.array(ShelfSchema).parse(response, { async: false });
};

export const shelvesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getShelves: build.query<UserShelf[], number>({
            query: (storageId) => ({
                url: API_URLS.shelves.getAll(storageId),
                method: HttpMethod.GET
            }),
            providesTags: (_, __, storageId) => [{ type: ProvidedTag.SHELVES, id: storageId }],
            transformResponse: handleTransformGetShelvesResponse
        }),
        createShelf: build.mutation<MessageResponse, CreateShelfDto>({
            query: (body) => ({
                url: API_URLS.shelves.main,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: (_, __, { storageId }) => [{ type: ProvidedTag.SHELVES, id: storageId }],
            transformResponse: handleTransformMessageResponse
        }),
        changeShelfName: build.mutation<MessageResponse, UpdateShelfDto>({
            query: ({ id, name }) => ({
                url: API_URLS.shelves.main,
                method: HttpMethod.PATCH,
                body: { id, name }
            }),
            invalidatesTags: (_, __, { storageId }) => [{ type: ProvidedTag.SHELVES, id: storageId }],
            transformResponse: handleTransformMessageResponse
        }),
        deleteShelf: build.mutation<MessageResponse, DeleteShelfDto>({
            query: ({ id }) => ({
                url: API_URLS.shelves.main,
                method: HttpMethod.DELETE,
                body: { id }
            }),
            invalidatesTags: (_, __, { storageId }) => [{ type: ProvidedTag.SHELVES, id: storageId }],
            transformResponse: handleTransformMessageResponse
        })
    })
});
