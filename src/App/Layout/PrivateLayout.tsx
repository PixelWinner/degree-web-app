import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsAuthenticated } from "@store/slices/auth/auth.selectors";
import { useAppSelector } from "@store/store.hooks";

import { PAGE_PATH } from "@utils/constants/common.constants";

const PrivateLayout = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={PAGE_PATH.login} replace />;
    }

    return <Outlet />;
};

export default PrivateLayout;
