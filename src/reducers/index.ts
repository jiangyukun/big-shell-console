/**
 * Created by jiangyukun on 2017/10/16.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import message from 'wj-appcore/message/message.reducer'
import {wrapReducerState} from 'wj-appcore/tools/redux-utils'
import data from './data.reducer'
import {PATIENT_INFO, LABORATORY_SHEET, DOCTOR_AUDIT} from '../core/constants/types'

export default combineReducers({
  router: routerReducer,
  message: wrapReducerState(message),
  patientInfoList: wrapReducerState(data(PATIENT_INFO.FETCH_LIST)),
  laboratorySheetList: wrapReducerState(data(LABORATORY_SHEET.FETCH_LIST)),
  doctorAuditList: wrapReducerState(data(DOCTOR_AUDIT.FETCH_LIST)),
})
