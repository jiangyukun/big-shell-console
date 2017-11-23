/**
 * Created by jiangyukun on 2017/10/26.
 */
import {_get, _post, _patch} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {LABORATORY_SHEET} from '../../core/constants/types'
import {handleLaboratorySheetList, handleSheetCategoryList} from './laboratory-sheet.helper'

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

export function fetchSheetCategoryList(mobile, type) {
  return {
    [THREE_PHASE]: {
      type: LABORATORY_SHEET.FETCH_SHEET_CATEGORY_LIST,
      http: () => _get(urlPrefix + `/v1/assay/queryAssayCountByType/${mobile}/${type}`),
      handleResponse: handleSheetCategoryList
    }
  }
}

export function updateSheetStatus(sheetId, sheetStatus) {
  return {
    [THREE_PHASE]: {
      type: LABORATORY_SHEET.UPDATE_SHEET_STATUS,
      http: () => _patch(urlPrefix + `/v1/assay/updateAssayStatusById/${sheetId}/${sheetStatus}`)
    }
  }
}

export function updateSheetRemark(id, remark) {
  return {
    [THREE_PHASE]: {
      type: LABORATORY_SHEET.UPDATE_REMARK,
      http: () => _get(urlPrefix + `/v1/assay/updateAssayRemark/${id}/${remark}`)
    }
  }
}
