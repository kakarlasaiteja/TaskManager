/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import Immutable from "immutable";
import * as actions from './actions'

const loginRecord = Immutable.Record({
    isLoggedIn: false,
    username: null,
    userNameField: '',
    idField: '',
    userToken: null,
    imageURL: ''
})

const initialState = new loginRecord()

function loginReducer(state = initialState, action){
    switch(action.type){
        case actions.LOGIN_SUCCESS: {
            return state.merge({ isLoggedIn: true})
        }
        case actions.LOGGED_IN_USER: {
            const username = action.payload
            return state.merge({ username: username})
        }
        case actions.LOGGED_IN_USER_TOKEN: {
            const token = action.payload
            return state.merge({ userToken: token})
        }
        case "LOGOUT_USER": {
            return state.merge({ isLoggedIn: false, userNameField: null, idField: null,  userToken: null})
        }
        case "CHANGE_ID_FIELD": {
            const id = action.payload
            return state.merge({ idField: id})
        }
        case "CHANGE_USERNAME_FIELD": {
            const userNameField = action.payload
            return state.merge({ userNameField: userNameField})
        }
        case "UPDATE_IMAGE_URL": {
            const imageUrl = action.payload
            return state.merge({ imageURL: imageUrl})
        }
        default:
            return state
    }
}

export default loginReducer