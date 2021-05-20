import axios from 'axios'
import { ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants'

export const listProducts = () => async dispatch => {
    dispatch({type: PRODUCT_LIST_REQUEST})
    try {
        const res = await axios.get(`/api/products`)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: res.data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const listProductDetails = productId => async dispatch => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST
    })
    try {
        const res = await axios.get('/api/products/' + productId)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProductByAdmin = productId => async (dispatch, getState) => {
    const { userLogin: { userInfo: { token }}} = getState()
    try {
        dispatch({
            type: ADMIN_PRODUCT_DELETE_REQUEST
        })
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }}
        await axios.delete(`/api/products/${productId}`, config)
        dispatch({type: ADMIN_PRODUCT_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProductByAdmin = () => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo: { token }}} = getState()
        dispatch({
            type: ADMIN_PRODUCT_CREATE_REQUEST
        })
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }}
        const res = await axios.post(`/api/products/`, {}, config)
        dispatch({
            type: ADMIN_PRODUCT_CREATE_SUCCESS,
            payload: res?.data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}