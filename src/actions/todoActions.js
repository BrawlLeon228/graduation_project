export const ADD_TODO = 'addTask'
export const TOGGLE_TODO = 'toggleTask'

export const addTodo = (text) => ({
    type: ADD_TODO,
    payload: {text}
})
export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    payload: {id}
})
export const deleteTask = (id) => ({
    type: 'deleteTask',
    payload: {id}
})
