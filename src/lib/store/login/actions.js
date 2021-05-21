export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGGED_IN_USER = "LOGGED_IN_USER"
export const LOGGED_IN_USER_TOKEN = "LOGGED_IN_USER_TOKEN"

export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload
})

export const loginSuccess= (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const loggedInUser = (payload) => ({
    type: LOGGED_IN_USER,
    payload
})

export const loggedInUserToken = (payload) => ({
    type: LOGGED_IN_USER_TOKEN,
    payload
})