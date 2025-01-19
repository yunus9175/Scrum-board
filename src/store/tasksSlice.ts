import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    content: string;
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (_state, action: PayloadAction<Task[]>) => {
            return action.payload;
        },
        updateTaskOrder: (_state, action: PayloadAction<Task[]>) => {
            return action.payload;
        },
    },
});

export const { setTasks, updateTaskOrder } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
