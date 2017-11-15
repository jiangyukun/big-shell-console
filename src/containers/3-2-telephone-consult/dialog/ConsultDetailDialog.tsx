/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal/Modal'
import Confirm from 'app-core/common/Confirm'

import ConsultBasicInfo from './part/ConsultBasicInfo'
import RateInfo from './part/RateInfo'
import PaymentInfo from './part/PaymentInfo'
import UserAppeal from './part/UserAppeal'
import Other from './part/Other'

import Data from '../../../core/interface/Data'
import {fetchConsultDetail} from '../telephone-consult.action'
import ServiceInfo from './part/ServiceInfo'
import TwoSidesCall from './part/TwoSidesCall'

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

    return (
      <Modal className="telephone-consult-detail" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>的咨询订单 订单编号：{this.props.consultId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <ConsultBasicInfo/>
            <PaymentInfo/>
            <ServiceInfo/>
            <TwoSidesCall/>
            <RateInfo/>
            <UserAppeal/>
            <Other/>

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
