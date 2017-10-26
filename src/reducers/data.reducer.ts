/**
 * Created by jiangyukun on 2017/4/12.
 */
import {fromJS} from 'immutable'
import phase from '../core/constants/phase'

const initValue = {
  loading: false,
  loaded: false,
  data: null
}

const data = fetchType => (iState = fromJS(initValue), action) => {
  let nextIState = iState

  switch (action.type) {
    case fetchType + phase.START:
      nextIState = nextIState.set('loaded', false).set('loading', true)
      break

    case fetchType + phase.SUCCESS:
      nextIState = nextIState.set('loaded', true).set('loading', false).set('data', action.data)
      break

    case fetchType + phase.FAILURE:
      nextIState = nextIState.set('loaded', false).set('loading', false).set('data', null)
      break

    default:
      break
  }

  return nextIState
}

export default data
