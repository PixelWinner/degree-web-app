import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { userDataApi } from "@store/apis/userData.api";
import { UserData, UserDataState } from "@store/slices/userData/userData.types";

const initialState: UserDataState = {
    data: {}
};

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(userDataApi.endpoints.getUserData.matchFulfilled, (state: UserDataState, action: PayloadAction<UserData>) => {
            state.data = { ...state.data, ...action.payload };
        });
    }
});
