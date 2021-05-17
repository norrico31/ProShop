import {combineReducers} from 'redux'
import { cartReducer } from './cartReducers'
import { productDetailsReducer, productListReducer } from './productReducers'
import {adminUserListReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer} from './userReducers'
import {orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from './orderReducers'

export const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    adminUserList: adminUserListReducer
})