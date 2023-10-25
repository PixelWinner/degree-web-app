import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import { Tab, Tabs, TabsProps } from "@mui/material";

import { Body2Typography } from "@components/Typography";

const BASE_PATH_REG_EXP = /^\/([^/]*).*$/;

export type NavigationRoute = {
    pathname: string;
    translationKey: string;
    icon?: ReactElement;
};

export type NavigationTabsProps = {
    routes: NavigationRoute[];
    isFirstPathLevel?: boolean;
    onTabClick?: () => void;
} & TabsProps;

export const NavTabs = ({ routes, isFirstPathLevel = true, onTabClick, ...rest }: NavigationTabsProps) => {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const isPathNameInRoutes = routes.some((route) => pathname.includes(route.pathname));
    const firstPathName = `/${BASE_PATH_REG_EXP.exec(pathname)?.[1]}`;

    const currentPathName = findMatchingPath(isFirstPathLevel ? firstPathName : pathname, routes);

    const tabsValue = (isPathNameInRoutes && currentPathName) || false;

    return (
        <Tabs value={tabsValue} {...rest}>
            {routes.map((route) => {
                return (
                    <Tab
                        key={route.pathname}
                        value={route.pathname}
                        to={route.pathname}
                        onClick={onTabClick}
                        icon={route.icon}
                        iconPosition="start"
                        component={NavLink}
                        label={
                            <Body2Typography fontWeight={400} color="text.secondary">
                                {t(route.translationKey)}
                            </Body2Typography>
                        }
                    />
                );
            })}
        </Tabs>
    );
};

const findMatchingPath = (path: string, routes: NavigationRoute[]) => {
    const matchedRoute = routes.find((route) => path.includes(route.pathname));
    return matchedRoute ? matchedRoute.pathname : null;
};
