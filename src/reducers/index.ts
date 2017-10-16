/**
 * Created by jiangyukun on 2017/10/16.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import message from 'wj-appcore/message/message.reducer'
import {wrapReducerState} from 'wj-appcore/tools/redux-utils'

function test1(state, action) {
  return {}
}

export default combineReducers({
  router: routerReducer,
  message: wrapReducerState(message),
  app: combineReducers({
    test1,
    test2: test1
  })
})
