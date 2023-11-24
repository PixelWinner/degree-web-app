import { z } from "zod";

import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { StorageDataSchema, StorageSchema } from "@utils/typings/schemas/storage/storage.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import {
    AddUserToStorageDto,
    CreateStorageDto,
    DeleteStorageDto,
    DeleteUserFormStorageDto,
    GetStorageShelfListResponse,
    StorageData,
    TStorage,
    UpdateStorageDto
} from "@utils/typings/types/storages/storages.types";

const handleTransformGetStoragesResponse = (response: TStorage[]): TStorage[] => {
    return z.array(StorageSchema).parse(response, { async: false });
};

const handleTransformGetStorageDataResponse = (response: StorageData): StorageData => {
    return StorageDataSchema.parse(response, { async: false });
};

export const storagesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStorages: build.query<TStorage[], void>({
            query: () => ({
                url: API_URLS.storages.main,
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformGetStoragesResponse
        }),
        createStorage: build.mutation<MessageResponse, CreateStorageDto>({
            query: (body) => ({
                url: API_URLS.storages.main,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformMessageResponse
        }),
        changeStorageName: build.mutation<MessageResponse, UpdateStorageDto>({
            query: (body) => ({
                url: API_URLS.storages.main,
                method: HttpMethod.PATCH,
                body
            }),
            invalidatesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformMessageResponse
        }),
        deleteStorage: build.mutation<MessageResponse, DeleteStorageDto>({
            query: (body) => ({
                url: API_URLS.storages.main,
                method: HttpMethod.DELETE,
                body
            }),
            invalidatesTags: [ProvidedTag.STORAGES],
            transformResponse: handleTransformMessageResponse
        }),
        getStorageData: build.query<StorageData, number>({
            query: (id) => ({
                url: API_URLS.storages.getById(id),
                method: HttpMethod.GET
            }),
            providesTags: (_, __, id) => [{ type: ProvidedTag.STORAGE_DATA, id }],
            transformResponse: handleTransformGetStorageDataResponse
        }),
        deleteUserFromStorage: build.mutation<MessageResponse, DeleteUserFormStorageDto>({
            query: (body) => ({
                url: API_URLS.storages.deleteUser,
                method: HttpMethod.DELETE,
                body
            }),
            invalidatesTags: (_, __, { id }) => [{ type: ProvidedTag.STORAGE_DATA, id }],
            transformResponse: handleTransformMessageResponse
        }),
        addUserToStorage: build.mutation<MessageResponse, AddUserToStorageDto>({
            query: (body) => ({
                url: API_URLS.storages.addUser,
                method: HttpMethod.POST,
                body
            }),
            invalidatesTags: (_, __, { storageId }) => [{ type: ProvidedTag.STORAGE_DATA, id: storageId }],
            transformResponse: handleTransformMessageResponse
        }),
        getStorageShelfList: build.query<GetStorageShelfListResponse, void>({
            query: () => ({
                url: API_URLS.storages.list,
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.STORAGE_SHELF_LIST]
            // transformResponse: handleTransformGetStoragesResponse
        })
    })
});
