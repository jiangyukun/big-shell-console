/**
 * Created by jiangyukun on 2017/6/29.
 */
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import createBrowserHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {AppContainer} from 'react-hot-loader'

import './css/index'
import Root from './containers/Root'
import allReducers from './reducers/'
import request_3_phase from './middlewares/request_3_phase'
import handle_error from './middlewares/handle_error'
import rootSaga from './sagas/'

let history = createBrowserHistory()
let sagaMiddleware = createSagaMiddleware()
const middleware = routerMiddleware(history)
const store = createStore(allReducers, {}, applyMiddleware(middleware, request_3_phase, handle_error, sagaMiddleware))
sagaMiddleware.run(rootSaga)

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/').default
    store.replaceReducer(nextRootReducer)
  })
}

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render()
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render()
  })
}
