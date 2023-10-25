import { createSelector } from "@reduxjs/toolkit";

import { UserDataState } from "@store/slices/userData/userData.types";
import { RootState } from "@store/store.types";

export const selectUserDataState = (state: RootState) => state.userData;
export const selectUserData = createSelector(selectUserDataState, (state: UserDataState) => state.data);
