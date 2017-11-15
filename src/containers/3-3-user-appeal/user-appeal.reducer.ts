/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {USER_APPEAL} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,

}

export default function userAppeal(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
    .handle(USER_APPEAL.UPDATE_REMARK, 'updateRemarkSuccess')
    .get()

  return nextIState
}
