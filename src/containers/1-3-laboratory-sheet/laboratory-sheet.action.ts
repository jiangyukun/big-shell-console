/**
 * Created by jiangyukun on 2017/10/26.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {LABORATORY_SHEET} from '../../core/constants/types'
import {handleLaboratorySheetList} from './laboratory-sheet.helper'

const urlPrefix = '/backend/patient'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: LABORATORY_SHEET.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/assay/list', {body: options}),
      handleResponse: handleLaboratorySheetList
    }
  }
}
