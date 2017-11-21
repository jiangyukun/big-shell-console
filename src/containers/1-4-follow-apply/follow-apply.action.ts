/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {FOLLOW_APPLY} from '../../core/constants/types'

const urlPrefix = '/backend/patient'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: FOLLOW_APPLY.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/apply/attention/list', {body: options}),
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
      type: FOLLOW_APPLY.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/appeal/remark/edit?question_order_code=${orderCode}&order_type=${orderType}&appeal_remark=${remark}`)
    }
  }
}
