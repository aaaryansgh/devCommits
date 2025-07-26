import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(State,action)=>{
            return action.payload
        },
        removeFeed:(state,action)=>{
            const newArray=state.filter((f)=>f._id!==action.payload);
            return newArray.length > 0 ? newArray : null; // Return null if the
        }
    }
})
export const{addFeed,removeFeed}=feedSlice.actions;
export default feedSlice.reducer;