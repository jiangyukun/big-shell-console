/**
 * Created by jiangyukun on 2017/10/26.
 */
export function handleLaboratorySheetList(data) {
  return {
    total: data['totalCount'],
    list: data['list']
  }
}
