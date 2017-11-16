/**
 * Created by jiangyukun on 2017/10/16.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import message from 'app-core/message/message.reducer'
import {wrapReducerState} from 'app-core/tools/redux-utils'

import data from './data.reducer'
import pageList from './page-list.reducer'
import {APP, PATIENT_INFO, LABORATORY_SHEET, DOCTOR_AUDIT, QUESTIONS_ANSWERS, TELEPHONE_CONSULT, USER_APPEAL, HOSPITAL_MANAGE} from '../core/constants/types'
import qaOrder from '../containers/3-1-questions-answers/qa-order.reducer'
import telephoneConsult from '../containers/3-2-telephone-consult/telephone-consult.reducer'
import userAppeal from '../containers/3-3-user-appeal/user-appeal.reducer'
import hospitalManage from '../containers/2-2-hospital-manage/hospital-manage.reducer'

export default combineReducers({
  router: routerReducer,
  message: wrapReducerState(message),

  provinceList: wrapReducerState(data(APP.FETCH_PROVINCE_LIST)),
  cityList: wrapReducerState(data(APP.FETCH_CITY_LIST)),
  hospitalList: wrapReducerState(data(APP.FETCH_HOSPITAL_LIST)),

  /*1 患者*/
  patientInfoList: wrapReducerState(data(PATIENT_INFO.FETCH_LIST)),

  laboratorySheetList: wrapReducerState(data(LABORATORY_SHEET.FETCH_LIST)),


  /*2 医生*/
  doctorAuditList: wrapReducerState(data(DOCTOR_AUDIT.FETCH_LIST)),

  hospitalManage: wrapReducerState(hospitalManage),
  hospitalManageList: wrapReducerState(data(HOSPITAL_MANAGE.FETCH_LIST)),

  /*3 订单*/
  qaOrder: wrapReducerState(qaOrder),
  questionAnswerList: wrapReducerState(data(QUESTIONS_ANSWERS.FETCH_LIST)),
  orderOperationList: wrapReducerState(pageList(QUESTIONS_ANSWERS.FETCH_ORDER_OPERATION_LIST)),
  orderDetail: wrapReducerState(data(QUESTIONS_ANSWERS.FETCH_ORDER_DETAIL)),

  telephoneConsult: wrapReducerState(telephoneConsult),
  telephoneConsultList: wrapReducerState(data(TELEPHONE_CONSULT.FETCH_LIST)),
  telephoneConsultDetail: wrapReducerState(data(TELEPHONE_CONSULT.FETCH_CONSULT_DETAIL)),


  userAppeal: wrapReducerState(userAppeal),
  userAppealList: wrapReducerState(data(USER_APPEAL.FETCH_LIST)),
  appealTypeList: wrapReducerState(data(USER_APPEAL.FETCH_APPEAL_TYPE_LIST)),

  /*4*/
})
