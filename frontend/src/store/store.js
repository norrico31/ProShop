import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import {reducer} from './reducers'

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage },
    userLogin: {
        userInfo: userInfoFromLocalStorage
    }
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(reduxThunk)))

export default store