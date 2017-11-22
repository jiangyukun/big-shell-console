/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CLINIC_DATE} from '../../core/constants/types'

const urlPrefix = '/backend/doctor'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: CLINIC_DATE.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/doctor/outPatientTime/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function updateRemark(orderCode, orderType, remark) {
  return {
    [THREE_PHASE]: {
      type: CLINIC_DATE.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/appeal/remark/edit?question_order_code=${orderCode}&order_type=${orderType}&appeal_remark=${remark}`)
    }
  }
}
