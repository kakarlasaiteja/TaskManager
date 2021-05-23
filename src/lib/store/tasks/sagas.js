/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { take, put, call, select } from "redux-saga/effects";
import axios from 'axios'

import { getJson, postJson, putJson, deleteJson } from '../../lib'
import * as actions from './actions'

export const postData = function (url, data, options) {
  return postJson({ url: url, data: data, options: options })
}

export const getData = function (url, options) {
  return getJson({ url: url, options: options })
}

export const putData = function (url, data, options) {
  return putJson({ url: url, data: data, options: options })
}

export const deleteData = function (url, options) {
  return deleteJson({ url: url, options: options })
}

const getToken = (state) => state.app.loginDetails.userToken

export const getDashboardData = function* () {
  while (true) {
    yield take(actions.GET_DASHBOARD_DATA)
    let token = yield select(getToken)
    let headers = {
      "Authorization": token,
      "accept": "application/json",
    }
    let api = "https://dev-dl.tdcx.com:3092/dashboard"
    try {
      const results = yield call(getData, api, { headers: headers })
      if (results.hasOwnProperty('tasksCompleted') && results.hasOwnProperty('totalTasks') && results.hasOwnProperty('latestTasks')) {
        yield put(actions.storeDashboardData(results))
        yield put(actions.getAllTasks())
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const getAllTasks = function* () {
  while (true) {
    yield take(actions.GET_ALL_TASKS)
    let token = yield select(getToken)
    let headers = {
      "Authorization": token,
      "accept": "application/json",
    }
    let api = "https://dev-dl.tdcx.com:3092/tasks"
    try {
      const results = yield call(getData, api, { headers: headers })
      if (results.hasOwnProperty('tasks') && results.tasks.length > 0) {
        yield put(actions.storeAllTasks(results.tasks))
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const addATask = function* () {
  while (true) {
    let addAction = yield take(actions.ADD_A_TASK)
    let token = yield select(getToken)
    console.log("tokes: ", token)
    let headers = {
      "Authorization": token,
      "Content-type": "application/json",
      "accept": "application/json",
    }
    let api = "https://dev-dl.tdcx.com:3092/tasks"
    try {
      const results = yield call(postData, api, addAction.payload, { headers: headers })
      yield put(actions.getDashboardData())
      yield put(actions.getAllTasks())
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const editATask = function* () {
  while (true) {
    let editAction = yield take(actions.EDIT_A_TASK)
    let token = yield select(getToken)
    let editTask = editAction.payload
    let headers = {
      "Authorization": token,
      "accept": "application/json",
    }
    let api = "https://dev-dl.tdcx.com:3092/tasks/" + editTask._id
    try {
      const results = yield call(putData, api, {
        name: editTask.name,
        completed: !editTask.completed
      }, { headers: headers })
      console.log("edit result: ", results)
      yield put(actions.getDashboardData())
      yield put(actions.getAllTasks())
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const editATaskName = function* () {
  while (true) {
    let editAction = yield take(actions.EDIT_A_TASK_NAME)
    let token = yield select(getToken)
    let editTask = editAction.payload
    let headers = {
      "Authorization": token,
      "accept": "application/json",
    }
    let api = "https://dev-dl.tdcx.com:3092/tasks/" + editTask.id
    try {
      const results = yield call(putData, api, {
        name: editTask.name,
      }, { headers: headers })
      console.log("edit result: ", results)
      yield put(actions.getDashboardData())
      yield put(actions.getAllTasks())
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const deleteATask = function* () {
  while (true) {
    let deleteAction = yield take(actions.DELETE_A_TASK)
    let token = yield select(getToken)
    let headers = {
      "Authorization": token,
      "accept": "application/json",
    }
    let api = "https://dev-dl.tdcx.com:3092/tasks/" + deleteAction.payload._id
    try {
      const results = yield call(deleteData, api, { headers: headers })
      console.log("delete result: ", results)
      yield put(actions.getDashboardData())
      yield put(actions.getAllTasks())
    } catch (error) {
      console.log('error', error)
    }
  }
}

