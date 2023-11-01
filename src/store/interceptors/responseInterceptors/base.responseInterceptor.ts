import { isArray } from "lodash";

import { toast } from "react-toastify";

import { getTranslatedValidationMessage } from "@utils/helpers/getTranslatedMessage.helper";
import { RtkQueryResponseInterceptor } from "@utils/typings/types/api.types";

type MessageApiResponse = { message?: string };

const LOG_OUT_ACTION_TYPE = "auth/setIsAuthenticated";

export const baseResponseInterceptor: RtkQueryResponseInterceptor = async (result, _, api) => {
    const response = result.data as MessageApiResponse;

    if (response && "message" in response && response.message) {
        toast.success(getTranslatedValidationMessage(response.message), { toastId: response.message });
    }

    if (result.error?.data?.message) {
        if (isArray(result.error?.data?.message)) {
            const messages = result.error?.data?.message;

            messages.forEach((message) => {
                toast.error(message, { toastId: message });
            });
        } else {
            const message = result.error?.data?.message;

            toast.error(message, { toastId: message });
        }
    }

    if (result.error?.status === 401) {
        api.dispatch({ type: LOG_OUT_ACTION_TYPE, payload: false });
        api.abort();
    }

    return result;
};
