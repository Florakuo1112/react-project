import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

// API_PATH
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const initialState = {
    messages:[],
    cartItems:[]
};

export const cartStatusSlice = createSlice({
    name: 'cartStatusSlice',
    initialState,
    reducers:{
        pushMessage(state, action){
            const {text, success} = action.payload;
            const id = Date.now();
            state.messages.push({
                id,text,success
            })
        },
        removeMessage(state,action){
            const messages_id = action.payload;
            const index = state.messages.findIndex((item) => item.id === messages_id);
            state.messages.splice(index,1);
        },
        getCartItems(state, action){
            state.cartItems = action.payload
        }
    }
});

export const fetchCartItems = createAsyncThunk(
    'cartStatusSlice/fetchCartItems',
    async(action, {dispatch})=>{
        try {
            console.log('fetchCartItems')
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            const cartItems = res.data?.data?.carts;
            console.log(cartItems)
            dispatch(getCartItems(cartItems));
        } catch (error) {
            console.log('getCartItems error', error);
        }
    }

)

export default cartStatusSlice.reducer;
export const {pushMessage, removeMessage, getCartItems} = cartStatusSlice.actions;