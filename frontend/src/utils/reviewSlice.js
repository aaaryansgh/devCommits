import { createSlice } from "@reduxjs/toolkit";
const reviewSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            const newArray=state.filter((r)=>r._id!==action.payload);
            return newArray.length > 0 ? newArray : null; // Return null if the array is empty
        }
    }
})
export const {addRequest,removeRequest}=reviewSlice.actions;
export default reviewSlice.reducer;