/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {HOSPITAL_MANAGE} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,

}

export default function hospitalManage(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
    .handle(HOSPITAL_MANAGE.UPDATE_REMARK, 'updateRemarkSuccess')
    .get()

  return nextIState
}
