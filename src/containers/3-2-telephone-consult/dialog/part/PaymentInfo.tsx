/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import Confirm from 'app-core/common/Confirm'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import {getDateTimeStr} from '../../../../core/utils/dateUtils'

interface PaymentInfoProps {
  paymentStatus: string
  payment: any
}

class PaymentInfo extends React.Component<PaymentInfoProps> {
  state = {
    showRefund: false
  }

  render() {
    const payment = this.props.payment
    const paymentStatus = this.props.paymentStatus

    return (
      <section className="qa-big-category payment-info">
        {
          this.state.showRefund && (
            <Confirm
              message="确定要退款吗？退款将原路径返还到付款账户"
              onConfirm={() => null}
              onExited={() => this.setState({showRefund: false})}
            />
          )
        }
        <OrderCategoryTitle src={require('../icon/card.svg')} title="付款信息"/>
        {
          paymentStatus == '1' && (
            <div className="category-item">
              <Label size="small">付款状态</Label>
              <div>未付款</div>
            </div>
          )
        }
        {
          paymentStatus != '1' && (
            <div className="category-item payment-info-summary">

              <div className="money-container">
                <div>
                  <div className="money-count">
                    <span>￥</span>
                    <span>{payment['pay_money']}</span>
                  </div>
                  <div className="money-text">付款金额</div>
                </div>
              </div>
              <div className="refund">
                <button className="refund-btn" onClick={() => this.setState({showRefund: true})}>退款</button>
              </div>
            </div>
          )
        }

      </section>
    )
  }
}

export default PaymentInfo
