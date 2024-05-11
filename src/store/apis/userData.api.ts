import { baseApi } from "@store/apis/base.api";
import { UserData } from "@store/slices/userData/userData.types";

import { API_URLS } from "@utils/constants/api.constants";
import { HttpMethod, ProvidedTag } from "@utils/typings/enums/api.enums";
import { UserDataResponseSchema } from "@utils/typings/schemas/userData/userData.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";
import { ChangePasswordDto } from "@utils/typings/types/auth/auth.types";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";

const handleTransformGetUserDataResponse = (response: UserData): UserData => {
    return UserDataResponseSchema.parse(response, { async: false });
};

export const userDataApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<UserData, void>({
            query: () => ({
                url: API_URLS.users.getUserData,
                method: HttpMethod.GET
            }),
            providesTags: [ProvidedTag.USER_DATA],
            transformResponse: handleTransformGetUserDataResponse
        }),
        changePassword: build.mutation<MessageResponse, ChangePasswordDto>({
            query: (body) => ({
                url: API_URLS.users.changePassword,
                method: HttpMethod.POST,
                body
            }),
            transformResponse: handleTransformMessageResponse
        })
    })
});
