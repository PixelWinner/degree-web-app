import React from "react";
import { GlobalStyle } from "@utils/styles/GlobalStyles";
import AppPages from "@pages/AppPages";
import { ErrorBoundary } from "./ErrorBoundary";
import { ThemeProvider } from "@utils/providers/ThemeProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@store/store";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <ThemeProvider>
                        <ErrorBoundary>
                            <GlobalStyle />
                            <AppPages />
                        </ErrorBoundary>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
