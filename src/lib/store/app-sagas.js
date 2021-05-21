/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import { all, fork } from 'redux-saga/effects';

import { loginUser } from "./login/sagas";
import { getDashboardData, getAllTasks, addATask, editATask, deleteATask } from "./tasks/sagas";

const appSagas = function *() {
    yield all([
        fork(loginUser),
        fork(getDashboardData),
        fork(getAllTasks),
        fork(addATask),
        fork(editATask),
        fork(deleteATask)
    ])
}

export default [
    appSagas
]