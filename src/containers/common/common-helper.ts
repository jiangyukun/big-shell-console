/**
 * Created by jiangyukun on 2017/10/26.
 */
import Data from '../../core/interface/Data'
import List from '../../core/interface/List'
import {getDateStr} from '../../core/utils/dateUtils'
import phase from '../../core/constants/phase'

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

export function flagState(iState, action) {
  let nextIState = iState
  let chain = {
    get: () => nextIState,
    handle: (type, key) => {
      if (action.type == type + phase.START) {
        nextIState = iState.set(key, false)
      }
      if (action.type == type + phase.SUCCESS) {
        nextIState = iState.set(key, true)
      }
      return chain
    }
  }

  return chain
}

export function haveNotEmptyValue(obj, keys) {
  let notEmpty = false
  keys.forEach(key => {
    if (obj[key]) notEmpty = true
  })
  return notEmpty
}

export function getProvinceCityText(province, city, provinceList, cityList) {
  if (!province && !city) return ''
  let result = ''
  if (province) {
    result += provinceList.find(item => item.value == province).text
  }
  if (city) {
    result += '，' + cityList.find(item => item.value == city).text
  }

  return result
}

export function getYesNo(code) {
  if (code == 0) return '否'
  if (code == 1) return '是'
  return '未知'
}
