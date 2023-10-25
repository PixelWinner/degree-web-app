import { useLayoutEffect } from "react";

import { persistor } from "@store/store";

import { handleRemoveSession } from "@utils/helpers/session.helpers";

export const useAuthEffect = (isAuthenticated: boolean) => {
    useLayoutEffect(() => {
        if (isAuthenticated) {
            persistor.persist();
        } else {
            handleRemoveSession();
            persistor.pause();
            setTimeout(() => persistor.purge(), 200);
        }
    }, [isAuthenticated]);
};
