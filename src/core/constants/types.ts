/**
 * Created by jiangyukun on 2017/10/26.
 */
function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix: string, obj: object): void {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}

export const APP = {
  FETCH_PROVINCE_LIST: null,
  FETCH_CITY_LIST: null,
  FETCH_HOSPITAL_LIST: null
}

export const PATIENT_INFO = {
  FETCH_LIST: null,
}

export const TREAT_SITUATION = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
}

export const LABORATORY_SHEET = {
  FETCH_LIST: null,
  FETCH_SHEET_CATEGORY_LIST: null,
  UPDATE_REMARK: null,
  UPDATE_SHEET_STATUS: null,
}

export const FOLLOW_APPLY = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
}

/* 医生 */
export const DOCTOR_AUDIT = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  FETCH_POSITION_LIST: null,
  UPDATE_DOCTOR: null,
}

export const HOSPITAL_MANAGE = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  ADD_HOSPITAL: null,
  UPDATE_HOSPITAL: null,
}

export const CLINIC_DATE = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
}

export const DOCTOR_WALLET = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
}

/* 订单 */
export const QUESTIONS_ANSWERS = {
  FETCH_LIST: null,
  FETCH_ORDER_OPERATION_LIST: null,
  FETCH_ORDER_DETAIL: null,
  UPDATE_REMARK: null,

}

export const TELEPHONE_CONSULT = {
  FETCH_LIST: null,
  FETCH_CONSULT_DETAIL: null,
  UPDATE_REMARK: null,

}

export const USER_APPEAL = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  FETCH_APPEAL_TYPE_LIST: null,

}

generatorValueFromKey('APP', APP)

generatorValueFromKey('PATIENT_INFO', PATIENT_INFO)
generatorValueFromKey('TREAT_SITUATION', TREAT_SITUATION)
generatorValueFromKey('LABORATORY_SHEET', LABORATORY_SHEET)

generatorValueFromKey('DOCTOR_AUDIT', DOCTOR_AUDIT)
generatorValueFromKey('HOSPITAL_MANAGE', HOSPITAL_MANAGE)

generatorValueFromKey('QUESTIONS_ANSWERS', QUESTIONS_ANSWERS)
generatorValueFromKey('TELEPHONE_CONSULT', TELEPHONE_CONSULT)
generatorValueFromKey('USER_APPEAL', USER_APPEAL)
