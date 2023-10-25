import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { authApi } from "@store/apis/auth.api";
import { AuthState } from "@store/slices/auth/auth.types";

import { getSession, handleSetSession } from "@utils/helpers/session.helpers";

const initialState: AuthState = {
    isAuthenticated: !!getSession()
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            handleSetSession(action.payload?.token);
            state.isAuthenticated = true;
        });
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
            handleSetSession(action.payload?.token);
            state.isAuthenticated = true;
        });
    }
});
