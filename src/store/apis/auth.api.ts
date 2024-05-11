import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { HttpMethod } from "@utils/typings/enums/api.enums";
import { TokenResponseSchema } from "@utils/typings/schemas/auth/auth.schemas";
import { LoginDto, RecoverPasswordDto, RegisterDto, ResetPasswordDto, TokenResponse } from "@utils/typings/types/auth/auth.types";
import { MessageResponse } from "@utils/typings/types/api.types";
import { handleTransformMessageResponse } from "@utils/helpers/handleTransformMessageResponse.helper";

const handleTransformLoginResponse = (response: TokenResponse): TokenResponse => {
    return TokenResponseSchema.parse(response, { async: false });
};

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<TokenResponse, LoginDto>({
            query: (body) => ({
                url: API_URLS.auth.login,
                method: HttpMethod.POST,
                body
            }),
            transformResponse: handleTransformLoginResponse,
            extraOptions: {
                ignoreAuth: true
            }
        }),
        register: build.mutation<TokenResponse, RegisterDto>({
            query: (body) => ({
                url: API_URLS.auth.register,
                method: HttpMethod.POST,
                body
            }),
            transformResponse: handleTransformLoginResponse,
            extraOptions: {
                ignoreAuth: true
            }
        }),
        reset: build.mutation<MessageResponse, ResetPasswordDto>({
            query: (body) => ({
                url: API_URLS.auth.reset,
                method: HttpMethod.POST,
                body
            }),
            extraOptions: {
                ignoreAuth: true
            },
            transformResponse: handleTransformMessageResponse
        }),
        recover: build.mutation<MessageResponse, RecoverPasswordDto>({
            query: (body) => ({
                url: API_URLS.auth.recovery,
                method: HttpMethod.POST,
                body
            }),
            extraOptions: {
                ignoreAuth: true
            },
            transformResponse: handleTransformMessageResponse
        })
    })
});
