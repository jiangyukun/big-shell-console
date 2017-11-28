/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {HOSPITAL_MANAGE} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
  addHospitalSuccess: false,
  updateHospitalSuccess: false
}

export default function hospitalManage(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
    .handle(HOSPITAL_MANAGE.UPDATE_REMARK, 'updateRemarkSuccess')
    .handle(HOSPITAL_MANAGE.ADD_HOSPITAL, 'addHospitalSuccess')
    .handle(HOSPITAL_MANAGE.UPDATE_HOSPITAL, 'updateHospitalSuccess')
    .get()

  return nextIState
}
