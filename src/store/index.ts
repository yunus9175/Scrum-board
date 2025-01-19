// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
