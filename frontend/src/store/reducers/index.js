import {combineReducers} from 'redux'
import { productDetailsReducer, productListReducer } from './productReducers'

export const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})