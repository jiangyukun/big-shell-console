/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {LABORATORY_SHEET} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
  updateSheetStatusSuccess: false,

}

export default function laboratorySheet(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
    .handle(LABORATORY_SHEET.UPDATE_REMARK, 'updateRemarkSuccess')
    .handle(LABORATORY_SHEET.UPDATE_SHEET_STATUS, 'updateSheetStatusSuccess')
    .get()

  return nextIState
}
