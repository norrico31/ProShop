import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL} from '../constants/orderConstants'
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