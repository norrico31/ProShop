import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_DETAILS_RESET, ADMIN_USER_LIST_REQUEST, ADMIN_USER_LIST_SUCCESS, ADMIN_USER_LIST_FAIL, ADMIN_USER_LIST_RESET, ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DELETE_FAIL} from '../constants/userConstants'
import {ORDER_LIST_MY_RESET} from '../constants/orderConstants'
import axios from 'axios'

export const login = (email, password) => async dispatch => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post(`/api/users/login`, {email, password}, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const register = (name, email, password) => async dispatch => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const {data} = await axios.post(`/api/users`, {name, email, password}, {headers: {'Content-Type': 'application/json'}})
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const { userLogin: { userInfo: { token }}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }}
        const res = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: res?.data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = user => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const { userLogin: { userInfo: { token }}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }}
        const res = await axios.patch(`/api/users/profile`, user, config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: res?.data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminListUsers = () => async (dispatch, getState) => {
    const { userLogin: { userInfo: { token }}} = getState()
    try {
        dispatch({
            type: ADMIN_USER_LIST_REQUEST
        })
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }}
        const res = await axios.get(`/api/users`, config)
        dispatch({
            type: ADMIN_USER_LIST_SUCCESS,
            payload: res?.data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminDeleteUser = userId => async (dispatch, getState) => {
    const { userLogin: { userInfo: { token }}} = getState()
    try {
        dispatch({
            type: ADMIN_USER_DELETE_REQUEST
        })
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }}
        await axios.delete(`/api/users/${userId}`, config)
        dispatch({type: ADMIN_USER_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: ADMIN_USER_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async dispatch => {
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: ADMIN_USER_LIST_RESET})
    localStorage.clear()
}
