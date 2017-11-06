/**
 * Created by jiangyukun on 2017/8/11.
 */
import {showMessage} from 'app-core/message/message.action'
import {MESSAGE_TYPE} from 'app-core/message/message.constants'

import phase from '../core/constants/phase'

export default ({dispatch, getState}) => next => action => {
  if (action.type.indexOf(phase.FAILURE) == -1) {
    return next(action)
  }
  return next(showMessage({
    msgType: MESSAGE_TYPE.FAILURE,
    content: action.err
  }))

}
