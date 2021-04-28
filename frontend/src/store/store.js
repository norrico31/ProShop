import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import {reducer} from './reducers'

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage },
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(reduxThunk)))

export default store