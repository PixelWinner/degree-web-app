import { HttpHeader } from "@utils/typings/enums/api.enums";
import { RtkQueryRequestInterceptor } from "@utils/typings/types/api.types";

export const multipartDataRequestInterceptor: RtkQueryRequestInterceptor<{ isMultipartData?: boolean }> = async (
    args,
    api,
    extraArgs
) => {
    if (extraArgs?.isMultipartData) {
        args.headers = new Headers((args.headers ?? {}) as Record<string, string>);

        args.headers.delete(HttpHeader.CONTENT_TYPE);
    }

    return args;
};
