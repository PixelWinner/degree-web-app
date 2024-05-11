import { createApi } from "@reduxjs/toolkit/dist/query/react";

import {
    authorizationTokenRequestInterceptor
} from "@store/interceptors/requestInterceptors/authorizationToken.requestInterceptor";

import { baseResponseInterceptor } from "@store/interceptors/responseInterceptors/base.responseInterceptor";

import { ProvidedTag } from "@utils/typings/enums/api.enums";
import { getBaseQueryWithInterceptors } from "@utils/helpers/getBaseQueryWithInterceptors.helper";

const API_REDUCER_PATH_NAME = "api";

const CACHE_LIVE_TIME = 0;

export const baseApi = createApi({
    reducerPath: API_REDUCER_PATH_NAME,
    keepUnusedDataFor: CACHE_LIVE_TIME,
    baseQuery: getBaseQueryWithInterceptors({
        requestInterceptors: [authorizationTokenRequestInterceptor],
        responseInterceptors: [baseResponseInterceptor]
    }),
    endpoints: () => ({}),
    tagTypes: Object.values(ProvidedTag)
});
