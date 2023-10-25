import i18n from "i18next";
import "normalize.css";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

import { Locale as DateFnsLocale } from "date-fns";
import setDefaultOption from "date-fns/setDefaultOptions";

import isNil from "lodash/isNil";

import { Locale } from "@utils/typings/enums/common.enums";

import AppLoader from "./App/AppLoader";
import "./i18n";

if (import.meta.hot && import.meta.env.DEV) {
    import.meta.hot.on(
        "vite:beforeUpdate",
        // eslint-disable-next-line no-console
        () => console.clear()
    );
}

const loadDateFnsLocale = () => {
    const LOCALE_LOADER: Record<Locale, () => Promise<DateFnsLocale>> = {
        [Locale.EN]: () => import("date-fns/locale/en-US").then((module: { default: DateFnsLocale }) => module.default),
        [Locale.UK]: () => import("date-fns/locale/uk").then((module: { default: DateFnsLocale }) => module.default)
    };

    return new Promise<void>((resolve, reject) => {
        i18n.on("languageChanged", (newLocale: Locale) => {
            LOCALE_LOADER[newLocale]()
                .then((locale) => {
                    setDefaultOption({
                        locale: locale
                    });
                })
                .catch(reject);
        });

        LOCALE_LOADER[i18n.language as Locale]()
            .then((locale) => {
                setDefaultOption({
                    locale: locale
                });
                resolve();
            })
            .catch(reject);
    });
};

const mountRootComponent = (NodeToRender: ReactNode, error?: Error): (() => void) | undefined => {
    !isNil(error) && console.error(error);

    const rootElement: HTMLElement = document.getElementById("root") as HTMLElement;

    if (rootElement.children.length) {
        return;
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(NodeToRender);

    return () => {
        root.unmount();

        // just to be sure that everything is deleted from root element
        for (const child of rootElement.children) {
            rootElement.removeChild(child);
        }
    };
};

const renderApp = (onUnmountInitialLoader?: () => void) => () =>
    import("./App/App").then(({ default: App }) => {
        onUnmountInitialLoader?.();
        mountRootComponent(<App />);
    });

const renderAppError = (onUnmountInitialLoader?: () => void) => async (error: Error) => {
    return import("./App/AppError").then(({ default: AppError }) => {
        onUnmountInitialLoader?.();
        mountRootComponent(<AppError error={error} />, error);
    });
};

const unmountInitialLoader = mountRootComponent(<AppLoader />);

Promise.all([loadDateFnsLocale()]).then(renderApp(unmountInitialLoader)).catch(renderAppError(unmountInitialLoader));
