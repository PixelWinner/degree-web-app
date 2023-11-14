import { ThemeProvider as SCThemeProvider } from "styled-components";

import React, { FC, PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

import { ThemeProvider as MuiThemeProvider, Theme, createTheme } from "@mui/material";
import { enUS } from "@mui/material/locale";

import { LocalStorage, ThemeMode } from "@utils/typings/enums/common.enums";

type ThemeModeContextType = {
    mode: ThemeMode;
    setThemeMode: (theme: ThemeMode) => void;
    toggleThemeMode: () => void;
    theme: Theme;
};

const INITIAL_THEME_MODE = (localStorage.getItem(LocalStorage.THEME) as ThemeMode) ?? ThemeMode.DARK;

const ThemeContext = createContext<ThemeModeContextType>({
    mode: INITIAL_THEME_MODE,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setThemeMode: () => {},
    toggleThemeMode: () => {},
    theme: createTheme(getThemeOptions(INITIAL_THEME_MODE), enUS)
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(INITIAL_THEME_MODE);

    const theme = createTheme(getThemeOptions(mode), enUS);

    const setThemeMode = (themeMode: ThemeMode) => {
        setMode(themeMode);
        localStorage.setItem(LocalStorage.THEME, themeMode);
    };

    const toggleThemeMode = () => {
        setThemeMode(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);
    };

    const contextValue: ThemeModeContextType = useMemo(
        () => ({
            mode,
            theme,
            setThemeMode,
            toggleThemeMode
        }),
        [mode, setMode]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <SCThemeProvider theme={theme}>
                <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
            </SCThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);

function getThemeOptions(mode: ThemeMode) {
    return {
        palette: {
            mode
        }
    };
}
