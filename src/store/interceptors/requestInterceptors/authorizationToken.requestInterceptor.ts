import { ApiContentType, HttpHeader } from "@utils/typings/enums/api.enums";
import { LocalStorage } from "@utils/typings/enums/common.enums";
import { RtkQueryRequestInterceptor } from "@utils/typings/types/api.types";

export const authorizationTokenRequestInterceptor: RtkQueryRequestInterceptor<{ ignoreAuth?: boolean }> = async (
    args,
    api,
    extraArgs
) => {
    args.headers = new Headers((args.headers ?? {}) as Record<string, string>);

    args.headers.set(HttpHeader.CONTENT_TYPE, ApiContentType.APPLICATION_JSON);

    if (!extraArgs?.ignoreAuth) {
        const session = localStorage.getItem(LocalStorage.SESSION);

        session && args.headers.set(HttpHeader.AUTHORIZATION, `Bearer ${session}`);
    }

    return args;
};
