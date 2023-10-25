import React, { FC } from "react";

import { ThemeProvider } from "@utils/providers/ThemeProvider";
import { GlobalStyle } from "@utils/styles/GlobalStyles";

import ErrorPage, { ErrorPageProps } from "@components/ErrorPage";

type AppErrorProps = {
    error?: ErrorPageProps["error"];
};

const AppError: FC<AppErrorProps> = ({ error }) => {
    return (
        <ThemeProvider>
            <GlobalStyle />
            <ErrorPage error={error} />
        </ThemeProvider>
    );
};

export default AppError;
