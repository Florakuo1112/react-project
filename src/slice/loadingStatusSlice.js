import { createSlice } from "@reduxjs/toolkit";

export const loadingStatusSlice = createSlice({
    name: 'loadingStatusSlice',
    initialState : '',
    reducers:{
        changeLoadingState(state, action){
            if(action.payload !== undefined){
                return state
            };
            console.log(action.payload )
            state= action.payload
        }
    }
});

export default loadingStatusSlice.reducer;
export const {changeLoadingState} = loadingStatusSlice.actions;