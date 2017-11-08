/**
 * Created by jiangyukun on 2017/4/12.
 */
import {fromJS, List} from 'immutable'
import phase from '../core/constants/phase'

const initValue = {
  loading: false,
  loaded: false,
  list: null,
  total: -1
}

export function updateList(curIState, callback) {
  return curIState.update('list', list => callback(list))
}

const pageList = fetchType => (iState = fromJS(initValue), action) => {
  let nextIState = iState

  switch (action.type) {
    case fetchType + phase.START:
      nextIState = nextIState.set('loaded', false).set('loading', true)
      if (action.start == 0) {
        nextIState = nextIState.set('list', List([])).set('total', -1)
      }
      break

    case fetchType + phase.SUCCESS:
      let {total, list} = action.data
      nextIState = nextIState.set('loaded', true).set('loading', false).set('total', total)
      nextIState = updateList(nextIState, list1 => list1.concat(list || []))
      break

    case fetchType + phase.FAILURE:
      nextIState = nextIState.set('loaded', false).set('loading', false)
      break

    default:
      break
  }

  return nextIState
}

export default pageList
