import {combineReducers} from 'redux'
import { productListReducer } from './productReducers'

export const reducer = combineReducers({
    productList: productListReducer,
})