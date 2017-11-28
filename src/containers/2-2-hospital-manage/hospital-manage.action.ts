/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {HOSPITAL_MANAGE} from '../../core/constants/types'

const urlPrefix = '/backend/doctor'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: HOSPITAL_MANAGE.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/hospital/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function updateRemark(hospitalId, remark) {
  return {
    [THREE_PHASE]: {
      type: HOSPITAL_MANAGE.UPDATE_REMARK,
      http: () => _get(urlPrefix + `/v1/hospital/updateHospitalRemark/${hospitalId}/${remark}`)
    }
  }
}

export function addHospital(options) {
  return {
    [THREE_PHASE]: {
      type: HOSPITAL_MANAGE.ADD_HOSPITAL,
      http: () => _post(urlPrefix + '/v1/hospital/add', {body: options})
    }
  }
}

export function updateHospital(options) {
  return {
    [THREE_PHASE]: {
      type: HOSPITAL_MANAGE.UPDATE_HOSPITAL,
      http: () => _post(urlPrefix + '/v1/hospital/update', {body: options})
    }
  }
}
