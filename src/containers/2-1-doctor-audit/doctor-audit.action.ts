/**
 * Created by jiangyukun on 2017/10/26.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {DOCTOR_AUDIT} from '../../core/constants/types'
import {handleLaboratorySheetList} from './doctor-audit.helper'

const urlPrefix = '/backend/doctor'

export function fetchList(start, limit, searchKey) {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_AUDIT.FETCH_LIST,
      http: () => _get(urlPrefix + `/v1/doctor/check/list?start=${start}&rows=${limit}&search_key=${searchKey}`),
      handleResponse: handleLaboratorySheetList
    }
  }
}
