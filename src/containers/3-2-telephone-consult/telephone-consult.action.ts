/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {TELEPHONE_CONSULT} from '../../core/constants/types'

const urlPrefix = '/backend/order'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/consult/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function fetchConsultDetail(consultOrderCode) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.FETCH_CONSULT_DETAIL,
      http: () => _post(urlPrefix + `/v1/consult/info/${consultOrderCode}`),
      handleResponse: data => data
    }
  }
}

export function updateRemark(orderCode, remark) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/question/remark/edit?question_order_code=${orderCode}&order_remark=${remark}`)
    }
  }
}
