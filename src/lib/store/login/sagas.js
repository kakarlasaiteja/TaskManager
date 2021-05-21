/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import { take, put, call, select } from "redux-saga/effects";
import axios from 'axios'

import { getJson, postJson } from '../../lib'
import * as actions from './actions'

export const postData = function (url, data, options) {
    return postJson({ url: url, data: data, options: options })
}

export const getData = function (url) {
    return getJson({ url: url })
}

export const loginUser = function* () {
    while (true) {
        const userLoginAction = yield take(actions.LOGIN_USER)
        let userObject = {
            "name": userLoginAction.payload.username,
            "apiKey": userLoginAction.payload.apiKey
        }
        let headers = {
            "Content-type": "application/json",
            "accept": "application/json",
        }
        let api = "https://dev-dl.tdcx.com:3092/login"
        try {
            const results = yield call(postData, api, userObject, {headers: headers})
            if (results.token && results.token.name && results.token.token) {
                yield put(actions.loggedInUser(results.token.name))
                yield put(actions.loggedInUserToken(results.token.token))
            }
            if(results.msg && results.msg === "User logged in successfully"){
                yield put(actions.loginSuccess())
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}

