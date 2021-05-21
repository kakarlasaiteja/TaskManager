import { combineReducers } from 'redux'

import loginReducer from "./login/reducer";
import taskReducer from "./tasks/reducer";

const appReducer = combineReducers({
    loginDetails: loginReducer,
    taskDetails: taskReducer
})

export default appReducer