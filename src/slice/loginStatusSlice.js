import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API_PATH
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const loginStatusSlice = createSlice({
    name : 'loginStatusSlice',
    initialState:{
        isLogin : false,
    },
    reducers:{
        updateLoginStatus(state,action){
            state.isLogin = action.payload
        },
        takeToken(state,action){
            const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
                "$1",
              ); //找到cookie裡的loginToken後的第一個
              axios.defaults.headers.common['Authorization'] = token;
        }
    }
});

export const fetchLoginStatus = createAsyncThunk(
    'loginStatusSlice/fetchLoginStatus',
    async(action, {dispatch}) => {
        try {
            dispatch(takeToken());
            const res = await axios.post(`${API_BASE}/api/user/check`);
            console.log('fetchLoginStatus from slice 確認登入', res.data);
            if(res.data.success == true){
                dispatch(updateLoginStatus(true));
            };   
        } catch (error) {
            console.log('fetchLoginStatus', error.response.data.success);
            if(error.response.data.success == false){
                dispatch(updateLoginStatus(false));
            };
        }
    }
);

export const loginAction = createAsyncThunk(
    'loginStatusSlice/loginAction',
    async(action, {dispatch}) => {
        try {
            const res = await axios.post(`${API_BASE}/admin/signin`, action) 
            //axios.post(’’,{body},{header})
            console.log('loginAction', res.data.message);
            const {token, expired} = res.data;
            if(res.data.success == true){
                dispatch(updateLoginStatus(true));
                document.cookie = `loginToken=${token}; expires=${new Date(expired)};path=/`
                axios.defaults.headers.common['Authorization'] = token;
            };  
        } catch (error) {
            console.log('loginAction', error.response.data.success);
            if(error.response.data.success == false){
                dispatch(updateLoginStatus(false));
            };            
        }
    }
);

export const logoutAction = createAsyncThunk(
    'loginStatusSlice/logoutAction',
    async(action, {dispatch}) =>{
        try {
            const res = await axios.post(`${API_BASE}/logout`);
            console.log('logoutAction', res.data.message);
            dispatch(updateLoginStatus(false));
        } catch (error) {
            console.log('logoutAction', error.response.data);
        }
    }
)

export default loginStatusSlice.reducer;
export const {updateLoginStatus, takeToken} = loginStatusSlice.actions