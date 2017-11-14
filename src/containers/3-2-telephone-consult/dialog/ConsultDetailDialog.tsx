/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal/Modal'
import Confirm from 'app-core/common/Confirm'

import RateInfo from './part/RateInfo'
import AnswerInfo from './part/AnswerInfo'
import PaymentInfo from './part/PaymentInfo'
import OrderBasicInfo from './part/OrderBasicInfo'
import UserAppeal from './part/UserAppeal'
import Other from './part/Other'

import Data from '../../../core/interface/Data'
import {fetchConsultDetail} from '../telephone-consult.action'

interface OrderDetailDialogProps {
  consultId: string
  fetchConsultDetail: (orderCode) => void
  orderDetail: Data<any>
  onExited: () => void
}

class OrderDetailDialog extends React.Component<OrderDetailDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,

  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: OrderDetailDialogProps) {
    /*if (!this.props.Success && nextProps.Success) {
      this.close()
    }*/
  }

  componentDidMount() {
    this.props.fetchConsultDetail(this.props.consultId)
  }

  render() {
    const detail = this.props.orderDetail.data || {}
    const basicInfo = detail['base_info'] || {}
    const username = detail['real_name']
    const other = detail['other_info'] || {}

    const paymentStatus = detail['pay_status']
    const payment = detail['pay_info'] || {}

    const answerStatus = detail['answer_status'] != '1'
    const answer = detail['answer_info'] || {}

    const rateStatus = detail['evaluate_status'] != '1'
    const rate = detail['evaluate_info']

    const appealStatus = detail['appeal_status'] != '1'
    const appeal = detail['appeal_info']

    return (
      <Modal className="qa-order-detail" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>{username} 的问答订单 订单编号： {this.props.consultId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <OrderBasicInfo detail={detail}/>
            <PaymentInfo paymentStatus={paymentStatus} payment={payment}/>
            <AnswerInfo answerStatus={answerStatus} answer={answer}/>
            <RateInfo rateStatus={rateStatus} rate={rate}/>
            <UserAppeal appealStatus={appealStatus} appeal={appeal}/>
            <Other other={other}/>

          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    orderDetail: state.orderDetail
  }
}

export default connect(mapStateToProps, {fetchConsultDetail})(OrderDetailDialog)
