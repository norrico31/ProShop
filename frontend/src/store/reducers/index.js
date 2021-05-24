import {combineReducers} from 'redux'
import { cartReducer } from './cartReducers'
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './productReducers'
import {adminUserDeleteReducer, adminUserListReducer, adminUserUpdateReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer} from './userReducers'
import {adminOrderDeliverReducer, adminOrderListReducer, orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from './orderReducers'

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
    adminUserList: adminUserListReducer,
    adminDeleteUser: adminUserDeleteReducer,
    adminUpdateUser: adminUserUpdateReducer,
    adminDeleteProduct: productDeleteReducer,
    adminCreateProduct: productCreateReducer,
    adminUpdateProduct: productUpdateReducer,
    adminOrderList: adminOrderListReducer,
    adminMarkOrderAsDelivered: adminOrderDeliverReducer
})