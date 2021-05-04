import {combineReducers} from 'redux'
import { cartReducer } from './cartReducers'
import { productDetailsReducer, productListReducer } from './productReducers'
import {userLoginReducer} from './userReducers'

export const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
})