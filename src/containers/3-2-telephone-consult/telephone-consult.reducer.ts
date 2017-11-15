/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {TELEPHONE_CONSULT} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,

}

export default function telephoneConsult(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
    .handle(TELEPHONE_CONSULT.UPDATE_REMARK, 'updateRemarkSuccess')
    .get()

  return nextIState
}
