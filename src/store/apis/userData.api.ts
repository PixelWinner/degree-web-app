import { baseApi } from "@store/apis/base.api";
import { UserData } from "@store/slices/userData/userData.types";

import { API_URLS } from "@utils/constants/api.constants";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { UserDataResponseSchema } from "@utils/typings/schemas/userData/userData.schemas";

const handleTransformGetUserDataResponse = (response: UserData): UserData => {
    return UserDataResponseSchema.parse(response, { async: false });
};

export const userDataApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<UserData, void>({
            query: () => ({
                url: API_URLS.getUserData,
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.USER_DATA],
            transformResponse: handleTransformGetUserDataResponse
        })
    })
});
