/**
 * Created by jiangyukun on 2017/10/26.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {DOCTOR_AUDIT} from '../../core/constants/types'
import {handleDoctorAuditList, handlePositionList} from './doctor-audit.helper'

const urlPrefix = '/backend/doctor'

export function fetchList(start, limit, searchKey) {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_AUDIT.FETCH_LIST,
      http: () => _get(urlPrefix + `/v1/doctor/check/list?start=${start}&rows=${limit}&search_key=${searchKey}`),
      handleResponse: handleDoctorAuditList
    }
  }
}

export function fetchPositionList() {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_AUDIT.FETCH_POSITION_LIST,
      http: () => _get(urlPrefix + '/v1/doctor/title/list'),
      handleResponse: handlePositionList
    }
  }
}

export function updateDoctor() {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_AUDIT.UPDATE_DOCTOR,
      http: () => _get(urlPrefix + '/v1/doctor/title/list'),
      handleResponse: handlePositionList
    }
  }
}

export function updateRemark(id, remark) {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_AUDIT.UPDATE_REMARK,
      http: () => _get(urlPrefix + `/v1/doctor/update/remark?doctor_info_id=${id}&remark=${remark}`)
    }
  }
}
