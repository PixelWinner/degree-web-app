import { BaseQueryApi, QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";

import { z } from "zod";

import { MessageResponseSchema } from "@utils/typings/schemas/common.schemas";

export type ErrorItem = { [key in string]: string };

export type ErrorData = {
    errors: ErrorItem[];
};

export type ApiError = {
    status: number;
    data?: ErrorData;
};

export type FetchApiError = FetchBaseQueryError & ApiError;

export type RtkQueryRequestInterceptor<ExtraArgs = Record<string, unknown>> = (
    args: FetchArgs,
    api: BaseQueryApi,
    extraArgs: ExtraArgs | void
) => MaybePromise<FetchArgs | void>;

export type RtkQueryResponseInterceptor<ExtraArgs = Record<string, unknown>> = (
    result: QueryReturnValue<unknown, FetchApiError, FetchBaseQueryMeta>,
    args: FetchArgs,
    api: BaseQueryApi,
    extraArgs: ExtraArgs | void,
    retry: (args: FetchArgs, extraArgs: ExtraArgs | void) => MaybePromise<QueryReturnValue<unknown, FetchApiError, FetchBaseQueryMeta> | void>
) => MaybePromise<QueryReturnValue<unknown, FetchApiError, FetchBaseQueryMeta> | void>;

export type MessageResponse = z.infer<typeof MessageResponseSchema>;
