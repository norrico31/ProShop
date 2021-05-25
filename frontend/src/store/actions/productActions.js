import axios from 'axios'
import { ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants'

export const listProducts = (keyword = '') => async dispatch => {
    dispatch({type: PRODUCT_LIST_REQUEST})
    try {
        const res = await axios.get(`/api/products?keyword=${keyword}`)
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

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo: { token }}} = getState()
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }}

        await axios.post(`/api/products/${productId}/reviews`, review, config)
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateProductByAdmin = product => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo: { token }}} = getState()
        dispatch({
            type: ADMIN_PRODUCT_UPDATE_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }}
        const {data} = await axios.patch(`/api/products/${product._id}`, product, config)
        dispatch({
            type: ADMIN_PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}