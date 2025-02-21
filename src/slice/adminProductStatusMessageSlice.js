import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages:[]
};

export const adminProductStatusMessageSlice = createSlice({
    name : 'adminProductStatusMessageSlice',
    initialState,
    reducers:{
        pushMessage(state, action){
            const {text, success} = action.payload;
            const id = Date.now();
            state.messages.push({
                id,
                text,
                success
            })
        },
        removeMessage(state, action){
            const messages_id = action.payload;
            const index = state.messages.findIndex((item) => item.id == messages_id);
            state.messages.splice(index,1);
        }
    }
});


export default adminProductStatusMessageSlice.reducer;
export const { pushMessage, removeMessage } = adminProductStatusMessageSlice.actions;