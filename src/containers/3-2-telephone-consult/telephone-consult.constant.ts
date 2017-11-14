/**
 * Created by jiangyukun on 2017/11/9.
 */
export const filters = {
  currentServiceStatus: [
    {value: '1', text: '等待确认服务时间'},
    {value: '2', text: '已确定计划服务时间'},
    {value: '3', text: '服务已结束'},
    {value: '4', text: '服务已取消'},
    {value: '5', text: '医生确认已服务'},
  ],
  answerStatus: [
    {value: '1', text: '无回答'},
    {value: '2', text: '已回答'},
  ],
  paymentStatus: [
    {value: '1', text: '已付款'},
    {value: '2', text: '已退款'},
  ],
  paymentType: [
    {value: '1', text: '微信'},
    {value: '2', text: '支付宝'},
    {value: '3', text: '无'},
  ],
  isHide: [
    {value: '1', text: '是'},
    {value: '2', text: '否'}
  ],
}

export const handleResults = [
  {value: '1', text: '未处理'},
  {value: '2', text: '申述成功'},
  {value: '3', text: '申述失败'},
]

export const paymentStatus = {
  1: '未付款',
  2: '已付款',
  3: '退款'
}

export const paymentType = {
  1: '支付宝',
  2: '微信'
}

export const paymentTypeMapper = {
  ZHI_FU_BAO: '1',
  WEI_XIN: '2',
}
