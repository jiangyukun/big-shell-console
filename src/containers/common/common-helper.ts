/**
 * Created by jiangyukun on 2017/10/26.
 */
import Data from '../../core/interface/Data'
import List from '../../core/interface/List'

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
