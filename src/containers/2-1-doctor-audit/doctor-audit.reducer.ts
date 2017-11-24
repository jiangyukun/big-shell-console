/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {DOCTOR_AUDIT} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
  updateDoctorSuccess: false,
}

export default function doctorAudit(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
    .handle(DOCTOR_AUDIT.UPDATE_REMARK, 'updateRemarkSuccess')
    .handle(DOCTOR_AUDIT.UPDATE_DOCTOR, 'updateDoctorSuccess')
    .get()

  return nextIState
}
