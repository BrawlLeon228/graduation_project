import {createSlice} from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload)
            if (task) {
                task.isCompleted = !task.isCompleted
            }
        }
        ,
        deleteTask: (state, action) => {
            const tasks = state.tasks.filter((task) => task.id !== action.payload)
            state.tasks = tasks
        }
    }
})

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;