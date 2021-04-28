import {render} from 'react-dom';
import {App} from './App'
import {Provider} from 'react-redux'
import store from './store/store'
import './index.css';
import './bootstrap.min.css'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
