/**
 * http请求3个阶段的封装
 * Created by jiangyukun on 2017/1/25.
 */

import phase from '../core/constants/phase'

export const THREE_PHASE = Symbol('THREE_PHASE')

export default ({dispatch, getState}) => next => action => {
  const threePhase = action[THREE_PHASE]
  if (typeof threePhase === 'undefined') {
    return next(action)
  }
  const type = threePhase.type
  const startParam = threePhase.startParam
  next({type: type + phase.START, ...startParam})

  threePhase.http(getState()).then(handleResponseData, handleError)

  function getDataReducerNeed(response) {
    if (!threePhase.handleResponse) {
      return {}
    }
    return threePhase.handleResponse(response)
  }

  function handleResponseData(response) {
    next({type: type + phase.SUCCESS, data: getDataReducerNeed(response)})
  }

  function handleError(err) {
    next({type: type + phase.FAILURE, err})
  }
}
