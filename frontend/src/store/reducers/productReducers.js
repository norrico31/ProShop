import { ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_RESET, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { 
                loading: true, 
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return { 
                loading: false, 
                product: action.payload 
            }
        case PRODUCT_DETAILS_FAIL:
            return { 
                loading: false,
                error: action.payload 
            }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ADMIN_PRODUCT_DELETE_REQUEST:
            return { 
                loading: true, 
                ...state
            }
        case ADMIN_PRODUCT_DELETE_SUCCESS:
            return { 
                loading: false, 
                success: true
            }
        case ADMIN_PRODUCT_DELETE_FAIL:
            return { 
                loading: false,
                error: payload 
            }
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ADMIN_PRODUCT_CREATE_REQUEST:
            return { 
                loading: true, 
                ...state
            }
        case ADMIN_PRODUCT_CREATE_SUCCESS:
            return { 
                loading: false, 
                success: true,
                product: payload
            }
        case ADMIN_PRODUCT_CREATE_FAIL:
            return { 
                loading: false,
                error: payload 
            }
        case ADMIN_PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}