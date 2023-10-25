import { MessageResponseSchema } from "@utils/typings/schemas/common.schemas";
import { MessageResponse } from "@utils/typings/types/api.types";

export const handleTransformMessageResponse = (response: MessageResponse): MessageResponse => {
    return MessageResponseSchema.parse(response, { async: false });
};
