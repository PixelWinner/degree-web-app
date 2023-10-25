import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { selectIsAuthenticated } from "@store/slices/auth/auth.selectors";
import { useAppSelector } from "@store/store.hooks";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { useAuthEffect } from "@utils/hooks/useAuthEffect.hook";
import { AuthFormType } from "@utils/typings/enums/common.enums";

import BackdropLoader from "@components/BackdropLoader";

import AppLayout from "../App/Layout/AppLayout";
import PrivateLayout from "../App/Layout/PrivateLayout";
import PublicLayout from "../App/Layout/PublicLayout";

const Auth = lazy(() => import("@components/Auth/Auth"));
const Storages = lazy(() => import("@pages/Storages/Storages"));
const Settings = lazy(() => import("@pages/Settings/Settings"));
const Shelves = lazy(() => import("@pages/Shelves/Shelves"));

const AppPages = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const Loader = <BackdropLoader isLoading />;

    useAuthEffect(isAuthenticated);

    const getInitialRoute = () => {
        if (isAuthenticated) {
            return PAGE_PATH.storages;
        }

        return PAGE_PATH.login;
    };

    const privateRoutes = [
        {
            path: PAGE_PATH.storages,
            element: <Storages />
        },
        {
            path: `${PAGE_PATH.shelves}/:storageId?`,
            element: <Shelves />
        }
    ].map(({ path, element }, index) => <Route key={index} path={path} element={<Suspense fallback={Loader}>{element}</Suspense>} />);

    const publicRoutes = [
        {
            path: PAGE_PATH.login,
            element: <Auth formType={AuthFormType.LOGIN} />
        },
        {
            path: PAGE_PATH.register,
            element: <Auth formType={AuthFormType.REGISTER} />
        },
        {
            path: PAGE_PATH.settings,
            element: <Settings />
        }
    ].map(({ path, element }, index) => <Route key={index} path={path} element={<Suspense fallback={Loader}>{element}</Suspense>} />);

    return (
        <Routes>
            <Route path={PAGE_PATH.main} element={<AppLayout />}>
                <Route index element={<Navigate to={getInitialRoute()} replace />} />
                <Route element={<PrivateLayout />}>{privateRoutes}</Route>
                <Route element={<PublicLayout />}>{publicRoutes}</Route>
                <Route path="*" element={<Navigate to={PAGE_PATH.main} replace />} />
            </Route>
        </Routes>
    );
};

export default AppPages;
