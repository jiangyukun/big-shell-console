/**
 * Created by jiangyukun on 2017/11/22.
 */
export const filters = {
  haveUnRecord: [
    {value: '1', text: '有'},
    {value: '2', text: '无'},
  ]
}

export const SHEET_TYPE_MAPPER = {
  patient: 1,
  doctor: 2,
  console: 3,
  un_record: 4,
  recorded: 5,
  invalid: 6,
  deleted: 7
}

export const SHEET_TYPE_TEXT_MAPPER = {
  1: '患者',
  2: '医生',
  3: '后台',
  4: '未录入',
  5: '已录入',
  6: '无效',
  7: '已删除'
}

export const SHEET_STATUS = {
  un_record: 1,
  recorded: 2,
  invalid: 3
}

export const SHEET_STATUS_TEXT = {
  1: '未录入',
  2: '已录入',
  3: '无效'
}
