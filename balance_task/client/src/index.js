import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// react와 redux 연결하는 부분
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import PromiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware, ReduxThunk)(createStore);
/* window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__() 이거는 크롬의 익스텐션(편리도구) 쓰기 위한거임*/
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <App />
  </Provider>,
  document.getElementById('root')
);
