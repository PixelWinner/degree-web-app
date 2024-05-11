import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { selectIsAuthenticated } from "@store/slices/auth/auth.selectors";
import { useAppSelector } from "@store/store.hooks";

import { PAGE_PATH } from "@utils/constants/common.constants";
import { useAuthEffect } from "@utils/hooks/useAuthEffect.hook";

import BackdropLoader from "@components/BackdropLoader";

import AppLayout from "../App/Layout/AppLayout";
import PrivateLayout from "../App/Layout/PrivateLayout";
import PublicLayout from "../App/Layout/PublicLayout";

const Login = lazy(() => import("@pages/Auth/Login"));
const Register = lazy(() => import("@pages/Auth/Register"));
const Storages = lazy(() => import("@pages/Storages/Storages"));
const Settings = lazy(() => import("@pages/Settings/Settings"));
const Shelves = lazy(() => import("@pages/Shelves/Shelves"));
const Home = lazy(() => import("@pages/Home/Home"));
const Products = lazy(() => import("@pages/Products/Products"));
const StorageSettings = lazy(() => import("@pages/StorageSettings/StorageSettings"));
const ProductsTable = lazy(() => import("@pages/ProductsTable/ProductsTable"));
const ProductsSearch = lazy(() => import("@pages/ProductsSearch/ProductsSearch"));
const ProductsSupply = lazy(() => import("@pages/ProductsSupply/ProductsSupply"));
const SupplyStatistics = lazy(() => import("@pages/SupplyStatistics/SupplyStatistics"));
const Archive = lazy(() => import("@pages/Archive/Archive"));
const Recovery = lazy(() => import("@pages/Auth/Recovery"));
const Reset = lazy(() => import("@pages/Auth/Reset"));

const AppPages = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const Loader = <BackdropLoader isLoading />;

    useAuthEffect(isAuthenticated);

    const getInitialRoute = () => {
        if (isAuthenticated) {
            return PAGE_PATH.home;
        }

        return PAGE_PATH.login;
    };

    const privateRoutes = [
        {
            path: `${PAGE_PATH.home}/*`,
            element: <Home />
        },
        {
            path: PAGE_PATH.storages,
            element: <Storages />
        },
        {
            path: `${PAGE_PATH.storages}/:storageId?`,
            element: <StorageSettings />
        },
        {
            path: `${PAGE_PATH.shelves}/:storageId`,
            element: <Shelves />
        },
        {
            path: `${PAGE_PATH.products.main}/:shelfId/:name?`,
            element: <Products />
        },
        {
            path: `${PAGE_PATH.products.table}/:storageId?/:shelfId?`,
            element: <ProductsTable />
        },
        {
            path: `${PAGE_PATH.products.search}/:name?`,
            element: <ProductsSearch />
        },
        {
            path: `${PAGE_PATH.products.supply}/:storageId?/:shelfId?`,
            element: <ProductsSupply />
        },
        {
            path: PAGE_PATH.supplyStatistics,
            element: <SupplyStatistics />
        },
        {
            path: `${PAGE_PATH.archive}/:page?/:name?`,
            element: <Archive />
        }
    ].map(({ path, element }, index) => <Route key={index} path={path} element={<Suspense fallback={Loader}>{element}</Suspense>} />);

    const publicRoutes = [
        {
            path: PAGE_PATH.login,
            element: <Login />
        },
        {
            path: PAGE_PATH.register,
            element: <Register />
        },
        {
            path: PAGE_PATH.settings,
            element: <Settings />
        },
        {
            path: PAGE_PATH.recovery,
            element: <Recovery />
        },
        {
            path: PAGE_PATH.reset,
            element: <Reset />
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
