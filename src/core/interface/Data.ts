/**
 * Created by jiangyukun on 2017/7/26.
 */
interface Data<T> {
  loaded: boolean
  loading: boolean
  data: T
}

export default Data
