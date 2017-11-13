/**
 * Created by jiangyukun on 2017/10/26.
 */
import Data from '../../core/interface/Data'
import List from '../../core/interface/List'
import {getDateStr} from '../../core/utils/dateUtils'

export function handleListData(responseData: Data<any>) {
  const {data, loading, loaded} = responseData
  let total = 0, list = []
  if (data) {
    total = data.total
    list = data.list
  }
  return {total, list, loading, loaded}
}

export function handlePageListData(responseData: List<any>) {
  let total = 0, list = []
  const {loading, loaded} = responseData
  if (responseData.total) {
    total = responseData.total
  }
  if (responseData.list) {
    list = responseData.list
  }

  return {total, list, loading, loaded}
}

export function getTxt(txt) {
  if (txt) return txt
  return '暂无'
}

export function getStartEndDateStr(startDate, endDate) {
  if (startDate && endDate) {
    return getDateStr(startDate) + ' 到 ' + getDateStr(endDate)
  }
  if (startDate) {
    return '>= ' + getDateStr(startDate)
  }
  if (endDate) {
    return getDateStr(endDate)
  }
}

export function haveNotEmptyValue(obj, keys) {
  let notEmpty = false
  keys.forEach(key => {
    if (obj[key]) notEmpty = true
  })
  return notEmpty
}
