/**
 * Created by jiangyukun on 2017/10/16.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import message from 'app-core/message/message.reducer'
import {wrapReducerState} from 'app-core/tools/redux-utils'
import data from './data.reducer'
import {PATIENT_INFO, LABORATORY_SHEET, DOCTOR_AUDIT, QUESTIONS_ANSWERS} from '../core/constants/types'

export default combineReducers({
  router: routerReducer,
  message: wrapReducerState(message),
  patientInfoList: wrapReducerState(data(PATIENT_INFO.FETCH_LIST)),
  laboratorySheetList: wrapReducerState(data(LABORATORY_SHEET.FETCH_LIST)),
  doctorAuditList: wrapReducerState(data(DOCTOR_AUDIT.FETCH_LIST)),
  questionAnswerList: wrapReducerState(data(QUESTIONS_ANSWERS.FETCH_LIST)),
})
