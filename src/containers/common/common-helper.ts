/**
 * Created by jiangyukun on 2017/10/26.
 */
import Data from '../../core/interface/Data'

export function handleListData(responseData: Data<any>) {
  const {data, loading, loaded} = responseData
  let total = 0, list = []
  if (data) {
    total = data.total
    list = data.list
  }
  return {total, list, loading, loaded}
}
