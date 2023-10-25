import { z } from "zod";

import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { UserStorageSchema } from "@utils/typings/schemas/storage/storage.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import { CreateStorageDto, DeleteStorageDto, UpdateStorageDto, UserStorage } from "@utils/typings/types/storages/storages.types";

const handleTransformGetStoragesResponse = (response: UserStorage[]): UserStorage[] => {
    return z.array(UserStorageSchema).parse(response, { async: false });
};
export const storagesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStorages: build.query<UserStorage[], void>({
            query: () => ({
                url: API_URLS.storages,
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformGetStoragesResponse
        }),
        createStorage: build.mutation<MessageResponse, CreateStorageDto>({
            query: (body) => ({
                url: API_URLS.storages,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformMessageResponse
        }),
        changeName: build.mutation<MessageResponse, UpdateStorageDto>({
            query: (body) => ({
                url: API_URLS.storages,
                method: HttpMethod.PATCH,
                body
            }),
            invalidatesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformMessageResponse
        }),
        deleteStorage: build.mutation<MessageResponse, DeleteStorageDto>({
            query: (body) => ({
                url: API_URLS.storages,
                method: HttpMethod.DELETE,
                body
            }),
            invalidatesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformMessageResponse
        })
    })
});
