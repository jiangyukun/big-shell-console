/**
 * Created by jiangyukun on 2017/10/26.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {PATIENT_INFO} from '../../core/constants/types'
import {handlePatientList} from './patient-info.helper'

const urlPrefix = '/backend/patient'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: PATIENT_INFO.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/patient/info/list', {body: options}),
      handleResponse: handlePatientList
    }
  }
}
