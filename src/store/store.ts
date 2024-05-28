import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";

import { authApi } from "@store/apis/auth.api";
import { baseApi } from "@store/apis/base.api";
import { productsApi } from "@store/apis/products.api";
import { shelvesApi } from "@store/apis/shelves.api";
import { storagesApi } from "@store/apis/storages.api";
import { suppliersApi } from "@store/apis/suppliers.api";
import { userDataApi } from "@store/apis/userData.api";
import { authSlice } from "@store/slices/auth/auth.slice";
import { userDataSlice } from "@store/slices/userData/userData.slice";
import { shipmentsApi } from "@store/apis/shipments.api";

const sliceReducers = {
    auth: authSlice.reducer,
    userData: userDataSlice.reducer
};

const apiReducers = {
    [authApi.reducerPath]: authApi.reducer,
    [userDataApi.reducerPath]: userDataApi.reducer,
    [storagesApi.reducerPath]: storagesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [shelvesApi.reducerPath]: shelvesApi.reducer,
    [suppliersApi.reducerPath]: suppliersApi.reducer,
    [shipmentsApi.reducerPath]: shipmentsApi.reducer
};

const blacklist = [...Object.keys(apiReducers)];

const persistConfig = {
    key: "root",
    storage,
    blacklist
};

const appReducer = combineReducers({
    ...sliceReducers,
    ...apiReducers
});

export const RESET_STORE_ACTION_TYPE = "resetStore";

export const rootReducer = (state: ReturnType<typeof appReducer>, action: AnyAction) => {
    //Reset store on logOut
    if (action.type === RESET_STORE_ACTION_TYPE) {
        return appReducer(undefined, { type: RESET_STORE_ACTION_TYPE });
    }

    return appReducer(state, action);
};

const reducers = persistReducer(persistConfig, rootReducer as typeof appReducer);

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(baseApi.middleware);
    }
});

const persistor = persistStore(store);

export { store, persistor };
