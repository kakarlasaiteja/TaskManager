export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA"
export const STORE_DASHBOARD_DATA = "STORE_DASHBOARD_DATA"
export const GET_ALL_TASKS = "GET_ALL_TASKS"
export const STORE_ALL_TASKS = "STORE_ALL_TASKS"
export const ADD_A_TASK = "ADD_A_TASK"
export const EDIT_A_TASK = "EDIT_A_TASK"
export const DELETE_A_TASK = "DELETE_A_TASK"
export const CHANGE_NEW_TASK_DIALOG = "CHANGE_NEW_TASK_DIALOG"
export const CHANGE_ADD_TASK_FIELD = "CHANGE_ADD_TASK_FIELD"

export const getDashboardData = () => ({
    type: GET_DASHBOARD_DATA
})

export const storeDashboardData = (payload) => ({
    type: STORE_DASHBOARD_DATA,
    payload
})

export const getAllTasks = () => ({
    type: GET_ALL_TASKS
})

export const addATask = (payload) => ({
    type: ADD_A_TASK,
    payload
})

export const editATask = (payload) => ({
    type: EDIT_A_TASK,
    payload
})

export const deleteATask = (payload) => ({
    type: DELETE_A_TASK,
    payload
})

export const storeAllTasks = (payload) => ({
    type: STORE_ALL_TASKS,
    payload
})

export const changeNewTaskDialog = (payload) => ({
    type: CHANGE_NEW_TASK_DIALOG,
    payload
})

export const changeAddTaskField = (payload) => ({
    type: CHANGE_ADD_TASK_FIELD,
    payload
})