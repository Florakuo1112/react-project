import { configureStore } from "@reduxjs/toolkit";
import loginStatusSlice from "./slice/loginStatusSlice";
import adminProductStatusMessageSlice from "./slice/adminProductStatusMessageSlice";

export default configureStore({
    reducer:{
        loginStatus:loginStatusSlice,
        adminProductStatus:adminProductStatusMessageSlice
    }
});