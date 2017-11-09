/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import Confirm from 'app-core/common/Confirm'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../common/OrderCategoryTitle'

interface PaymentInfoProps {

}

class PaymentInfo extends React.Component<PaymentInfoProps> {
  state = {
    showRefund: false
  }

  render() {
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
        <div className="category-item payment-info-summary">
          <div className="summary-basic-info">
            <div>
              <Label size="small">付款状态</Label>已付款
            </div>
            <div className="mt7">
              <Label size="small">付款方式</Label>微信
              <img src={require('../icon/weixin.svg')}/>
            </div>
            <div className="mt7">
              <Label size="small">付款时间</Label>2017-07-09 17:30:29
            </div>
          </div>
          <div className="money-container">
            <div>
              <div className="money-count">
                <span>￥</span>
                <span>10</span>
              </div>
              <div className="money-text">付款金额</div>
            </div>
          </div>
          <div className="refund">
            <button className="refund-btn" onClick={() => this.setState({showRefund: true})}>退款</button>
          </div>
        </div>
      </section>
    )
  }
}

export default PaymentInfo
