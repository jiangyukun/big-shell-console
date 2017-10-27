/**
 * Created by jiangyukun on 2017/10/26.
 */
function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix: string, obj: object): void {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}

export const PATIENT_INFO = {
  FETCH_LIST: null,

}

export const LABORATORY_SHEET = {
  FETCH_LIST: null,

}

generatorValueFromKey('PATIENT_INFO', PATIENT_INFO)
generatorValueFromKey('LABORATORY_SHEET', LABORATORY_SHEET)
