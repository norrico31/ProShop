import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants'

export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, {type, payload}) => {
    switch (type) {
        case CART_ADD_ITEM:
            const newItem = payload
            const existItem = state.cartItems.find(item => item.product === newItem.product)
            if (existItem) {
                return {...state, cartItems: state.cartItems.map(item => item.product === existItem.product ? newItem : item)}
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.product !== payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload,
            }
        default:
            return state
    }
}