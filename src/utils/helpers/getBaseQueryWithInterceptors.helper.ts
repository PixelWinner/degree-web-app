import { BaseQueryFn, FetchArgs, FetchBaseQueryMeta, fetchBaseQuery as createFetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiContentType, HttpHeader } from "@utils/typings/enums/api.enums";
import { FetchApiError, RtkQueryRequestInterceptor, RtkQueryResponseInterceptor } from "@utils/typings/types/api.types";

export const getBaseQueryWithInterceptors = ({
    requestInterceptors = [],
    responseInterceptors = []
}: {
    requestInterceptors?: RtkQueryRequestInterceptor[];
    responseInterceptors?: RtkQueryResponseInterceptor[];
}) => {
    const fetchBaseQuery = createFetchBaseQuery() as typeof baseQueryWithInterceptors;

    const baseQueryWithInterceptors: BaseQueryFn<FetchArgs, unknown, FetchApiError, Record<string, unknown> | void, FetchBaseQueryMeta> = async (
        args,
        api,
        extraOptions
    ) => {
        let overwrittenArgs: FetchArgs = args;

        for (const interceptor of requestInterceptors) {
            overwrittenArgs = (await interceptor(overwrittenArgs, api, extraOptions)) ?? overwrittenArgs;
        }

        let overwrittenResult = await fetchBaseQuery(overwrittenArgs, api, extraOptions);

        for (const interceptor of responseInterceptors) {
            overwrittenResult =
                (await interceptor(overwrittenResult, overwrittenArgs, api, extraOptions, (retryArgs, retryExtraOptions) =>
                    fetchBaseQuery(
                        {
                            ...overwrittenArgs,
                            ...retryArgs,
                            headers: {
                                [HttpHeader.CONTENT_TYPE]: ApiContentType.APPLICATION_JSON
                            }
                        },
                        api,
                        {
                            ...extraOptions,
                            ...retryExtraOptions
                        }
                    )
                )) ?? overwrittenResult;
        }

        return overwrittenResult;
    };

    return baseQueryWithInterceptors;
};
