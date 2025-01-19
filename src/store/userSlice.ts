import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    username: string | null;
}

const initialState: UserState = {
    username: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        clearUser: (state) => {
            state.username = null;
        },
    },
});

export const { setUsername, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userReducer;
