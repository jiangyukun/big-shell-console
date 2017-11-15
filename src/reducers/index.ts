/**
 * Created by jiangyukun on 2017/10/16.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import message from 'app-core/message/message.reducer'
import {wrapReducerState} from 'app-core/tools/redux-utils'

import data from './data.reducer'
import pageList from './page-list.reducer'
import {PATIENT_INFO, LABORATORY_SHEET, DOCTOR_AUDIT, QUESTIONS_ANSWERS, TELEPHONE_CONSULT, USER_APPEAL} from '../core/constants/types'
import qaOrder from '../containers/3-1-questions-answers/qa-order.reducer'
import telephoneConsult from '../containers/3-2-telephone-consult/telephone-consult.reducer'
import userAppeal from '../containers/3-3-user-appeal/user-appeal.reducer'

export default combineReducers({
  router: routerReducer,
  message: wrapReducerState(message),

  patientInfoList: wrapReducerState(data(PATIENT_INFO.FETCH_LIST)),

  laboratorySheetList: wrapReducerState(data(LABORATORY_SHEET.FETCH_LIST)),

  doctorAuditList: wrapReducerState(data(DOCTOR_AUDIT.FETCH_LIST)),

  qaOrder: wrapReducerState(qaOrder),
  questionAnswerList: wrapReducerState(data(QUESTIONS_ANSWERS.FETCH_LIST)),
  orderOperationList: wrapReducerState(pageList(QUESTIONS_ANSWERS.FETCH_ORDER_OPERATION_LIST)),
  orderDetail: wrapReducerState(data(QUESTIONS_ANSWERS.FETCH_ORDER_DETAIL)),

  telephoneConsult: wrapReducerState(telephoneConsult),
  telephoneConsultList: wrapReducerState(data(TELEPHONE_CONSULT.FETCH_LIST)),
  telephoneConsultDetail: wrapReducerState(data(TELEPHONE_CONSULT.FETCH_CONSULT_DETAIL)),

  userAppeal: wrapReducerState(userAppeal),
  userAppealList: wrapReducerState(data(USER_APPEAL.FETCH_LIST)),
})
