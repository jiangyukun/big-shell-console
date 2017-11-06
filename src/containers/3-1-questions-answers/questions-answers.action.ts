/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {QUESTIONS_ANSWERS} from '../../core/constants/types'

const urlPrefix = '/backend/order'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: QUESTIONS_ANSWERS.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/question/list', {body: options}),
      handleResponse: data => ({
        list: data['list'],
        total: data['totalCount']
      })
    }
  }
}
