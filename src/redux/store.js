import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { buyItemSlice } from "./slices/buyItem/buyItemSlice";
import { usersSlice } from "./slices/users/usersSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        buyItems: buyItemSlice.reducer,
        users: usersSlice.reducer
    }
});