import { ThemeProvider as SCThemeProvider } from "styled-components";

import React, { FC, PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

import { ThemeProvider as MuiThemeProvider, Theme, createTheme } from "@mui/material";
import { enUS } from "@mui/material/locale";

import { ThemeMode } from "@utils/typings/enums/common.enums";

type ThemeModeContextType = {
    themeMode: ThemeMode;
    setThemeMode: (theme: ThemeMode) => void;
    toggleThemeMode: () => void;
    theme: Theme;
};

const LOCAL_STORAGE_THEME_MODE_VARIABLE = "themeMode";

const INITIAL_THEME_MODE = (localStorage.getItem(LOCAL_STORAGE_THEME_MODE_VARIABLE) as ThemeMode) ?? ThemeMode.DARK;

const ThemeContext = createContext<ThemeModeContextType>({
    themeMode: INITIAL_THEME_MODE,
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
        localStorage.setItem(LOCAL_STORAGE_THEME_MODE_VARIABLE, themeMode);
    };

    const toggleThemeMode = () => {
        setThemeMode(mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK);
    };

    const contextValue: ThemeModeContextType = useMemo(
        () => ({
            themeMode: mode,
            setThemeMode,
            toggleThemeMode,
            theme
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
