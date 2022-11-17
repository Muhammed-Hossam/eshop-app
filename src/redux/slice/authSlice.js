import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const { email, userID } = action.payload;
      state.email = email;
      state.userID = userID;
      
    },
    LOGIN: (state, action) => {
      state.isLoggedIn = action.payload
      console.log('isLoggedIn => ', state.isLoggedIn);
    
    },
    SET_USERNAME: (state, action) => {
      state.userName = action.payload;
    }
  }
});

export const { SET_ACTIVE_USER, LOGIN, SET_USERNAME } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;