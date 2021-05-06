import {combineReducers} from 'redux'
import { cartReducer } from './cartReducers'
import { productDetailsReducer, productListReducer } from './productReducers'
import {userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer} from './userReducers'

export const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
})