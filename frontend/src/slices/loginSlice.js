import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
     name: 'login',
     initialState:{isloggedin:false ,superuser:false},
     reducers:{
        login:(state, actions) =>{
            state.isloggedin = true;
            state.superuser = true;
        },
        logout:(state) =>{
            localStorage.removeItem('token_login');
            state.isloggedin = false;
            state.superuser = false;
        }
     }
})

export const loginaction = loginSlice.actions;
export default loginSlice.reducer