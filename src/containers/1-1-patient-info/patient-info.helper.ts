/**
 * Created by jiangyukun on 2017/10/26.
 */
export function handlePatientList(data) {
  return {
    total: data['count'],
    list: data['list']
  }
}
