import { baseApi } from "@store/apis/base.api";

import { API_URLS } from "@utils/constants/api.constants";
import { HttpMethod } from "@utils/typings/enums/api.enums";
import { TokenResponseSchema } from "@utils/typings/schemas/auth/auth.schemas";
import { LoginDto, RegisterDto, TokenResponse } from "@utils/typings/types/auth/auth.types";

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
            extraOptions: {
                ignoreAuth: true
            }
        })
    })
});
