/**
 * Created by jiangyukun on 2017/11/13.
 */
import {paymentStatus, paymentType} from './qa-order.constant'

export function getPaymentText(status) {
  return paymentStatus[status]
}

export function getPaymentTypeText(status) {
  return paymentType[status]
}
