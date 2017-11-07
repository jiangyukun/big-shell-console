/**
 * Created by jiangyukun on 2017/7/26.
 */
interface List<T> {
  loaded: boolean
  loading: boolean
  total: number
  list: T[]
}

export default List
