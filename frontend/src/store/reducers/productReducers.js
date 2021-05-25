import { ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_RESET, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_RESET, ADMIN_PRODUCT_UPDATE_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS } from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages,
                page: action.payload.page
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productTopRatedReducer = (state = { products: [] }, {type, payload}) => {
    switch (type) {
        case PRODUCT_TOP_REQUEST:
            return { 
                loading: true, 
                products: [] 
            }
        case PRODUCT_TOP_SUCCESS:
            return { 
                loading: false, 
                products: payload
            }
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: payload }
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

export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { 
                ...state,
                loading: true, 
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { 
                loading: false, 
                success: true
            }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { 
                loading: false,
                error: action.payload 
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
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

export const productUpdateReducer = (state = {product:{}}, {type, payload}) => {
    switch (type) {
        case ADMIN_PRODUCT_UPDATE_REQUEST:
            return { 
                loading: true, 
            }
        case ADMIN_PRODUCT_UPDATE_SUCCESS:
            return { 
                loading: false, 
                success: true,
                product: payload
            }
        case ADMIN_PRODUCT_UPDATE_FAIL:
            return { 
                loading: false,
                error: payload 
            }
        case ADMIN_PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}