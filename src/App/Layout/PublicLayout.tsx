import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PAGE_PATH } from "@utils/constants/common.constants";
import { useAppSelector } from "@store/store.hooks";
import { selectIsAuthenticated } from "@store/slices/auth/auth.selectors";

const AUTH_PAGES = [PAGE_PATH.login, PAGE_PATH.register];
const PublicLayout = () => {
    const { pathname } = useLocation();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const isNeedRedirect = isAuthenticated && AUTH_PAGES.includes(pathname);

    if (isNeedRedirect) {
        return <Navigate to={PAGE_PATH.main} replace />;
    }

    return <Outlet />;
};

export default PublicLayout;