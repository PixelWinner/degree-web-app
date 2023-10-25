import { createSelector } from "@reduxjs/toolkit";

import { AuthState } from "@store/slices/auth/auth.types";
import { RootState } from "@store/store.types";

export const selectSidebarState = (state: RootState) => state.auth;

export const selectIsAuthenticated = createSelector(selectSidebarState, (state: AuthState) => state.isAuthenticated);
