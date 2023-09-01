import { createSlice } from '@reduxjs/toolkit';

// get user data from local storage
const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // save user data in local storage and state (= logged in)
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            // delete user data in local storage and state (= logged out)
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;