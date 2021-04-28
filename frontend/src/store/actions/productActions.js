import axios from 'axios'
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants'

export const listProducts = () => async dispatch => {
    dispatch({type: PRODUCT_LIST_REQUEST})
    try {
        const res = await axios.get(`/api/products`)
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: res.data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}