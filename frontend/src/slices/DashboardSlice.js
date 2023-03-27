import { createSlice } from "@reduxjs/toolkit";

export const DashboardSlice = createSlice({
     name: 'dashboard',
     initialState:{updateuser:''},
     reducers:{
        updateuser:(state,actions)=>{
               state.updateuser = actions.payload;
        }
     }
})

export const Dashboardaction = DashboardSlice.actions;
export default DashboardSlice.reducer
