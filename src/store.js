import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "./slice/loginStatusSlice";
import adminProductStatusMessageReducer from "./slice/adminProductStatusMessageSlice";
import loadingStatusReducer from "./slice/loadingStatusSlice";
import cartStatusReducer from "./slice/cartStatusSlice";

export default configureStore({
    reducer:{
        loginStatus:loginStatusReducer ,
        adminProductStatus:adminProductStatusMessageReducer,
        loadingStatus : loadingStatusReducer,
        cartStatus : cartStatusReducer
    }
});