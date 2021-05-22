import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL, ADMIN_ORDER_LIST_REQUEST, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_LIST_FAIL} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST})
        const {userLogin: {userInfo: {token}}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = orderId => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})
        const {userLogin: {userInfo: {token}}} = getState()
        const {data} = await axios.get(`/api/orders/${orderId}`, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST})
        const {userLogin: {userInfo: {token}}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.patch(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_LIST_MY_REQUEST})
        const {userLogin: {userInfo: {token}}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await axios.get(`/api/orders/myorders`, config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrderByAdmin = () => async (dispatch, getState) => {
    try {
        dispatch({type: ADMIN_ORDER_LIST_REQUEST})
        const {userLogin: {userInfo: {token}}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.get(`/api/orders`, config)
        dispatch({
            type: ADMIN_ORDER_LIST_SUCCESS,
            payload: res?.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}