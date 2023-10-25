import { store } from "@store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
