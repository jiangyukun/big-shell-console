/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import Confirm from 'app-core/common/Confirm'

import Data from '../../../core/interface/Data'
import {fetchOrderDetail} from '../questions-answers.action'
import {getTxt} from '../../common/common-helper'
import Label from '../../../components/element/Label'
import Button from '../../../components/button/Button'
import RateInfo from './part/RateInfo'
import AnswerInfo from './part/AnswerInfo'
import PaymentInfo from './part/PaymentInfo'
import OrderBasicInfo from './part/OrderBasicInfo'
import UserAppeal from './part/UserAppeal'

interface OrderDetailDialogProps {
  orderCode: string
  fetchOrderDetail: (orderCode) => void
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
    this.props.fetchOrderDetail(this.props.orderCode)
  }

  render() {
    const detail = this.props.orderDetail.data || {}
    const basicInfo = detail['base_info'] || {}
    const username = detail['real_name']

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
          <Modal.Title>{username} 的问答订单 订单编号： {this.props.orderCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>


            <OrderBasicInfo detail={detail}/>
            <PaymentInfo/>
            <AnswerInfo/>
            <RateInfo/>
            <UserAppeal/>


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

export default connect(mapStateToProps, {fetchOrderDetail})(OrderDetailDialog)
