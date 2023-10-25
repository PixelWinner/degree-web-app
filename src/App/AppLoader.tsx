import React from "react";

import { ThemeProvider } from "@utils/providers/ThemeProvider";
import { GlobalStyle } from "@utils/styles/GlobalStyles";

import BackdropLoader from "@components/BackdropLoader";

export default function AppLoader() {
    return (
        <ThemeProvider>
            <GlobalStyle />
            <BackdropLoader isLoading />
        </ThemeProvider>
    );
}
