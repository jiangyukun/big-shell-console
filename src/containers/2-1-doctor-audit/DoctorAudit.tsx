/**
 * Created by jiangyukun on 2017/11/3.
 */
import React from 'react'
import {connect} from 'react-redux'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {fetchList} from './doctor-audit.action'
import {handleListData} from '../common/common-helper'

interface DoctorAuditProps extends AppFunctionPage {
  doctorAuditList: Data<any>
}

class DoctorAudit extends React.Component<DoctorAuditProps> {
  state = {
    searchKey: '',
    index: -1,
    currentPage: 0
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList(newPage, 10, this.state.searchKey)
  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.doctorAuditList)

    return (
      <div className="app-function-page">
        <div className="list-wrap">
          <FixHeadList total={total}>
            <FixHead>
              <FixHead.Item>手机号码</FixHead.Item>
              <FixHead.Item> 医生姓名</FixHead.Item>
              <FixHead.Item>医院</FixHead.Item>
              <FixHead.Item>职称</FixHead.Item>
              <FixHead.Item>照片</FixHead.Item>
              <FixHead.Item>执业证编号</FixHead.Item>
              <FixHead.Item>专长</FixHead.Item>
              <FixHead.Item>审核状态</FixHead.Item>
              <FixHead.Item>创建时间</FixHead.Item>
              <FixHead.Item>备注</FixHead.Item>
            </FixHead>
            <FixBody>
              {
                list.map((item, index) => {
                  return (
                    <FixRow key={item['doctor_info_id']}
                            onClick={() => this.setState({index})}
                            selected={this.state.index == index}>
                      <FixRow.Item>{item['doctor_phone']}</FixRow.Item>
                      <FixRow.Item>{item['doctor_name']}</FixRow.Item>
                      <FixRow.Item>{item['hospital_name']}</FixRow.Item>
                      <FixRow.Item>{item['doctor_title_name']}</FixRow.Item>
                      <FixRow.Item>{item['doctor_photo_url']}</FixRow.Item>
                      <FixRow.Item>{item['doctor_license_url']}</FixRow.Item>
                      <FixRow.Item>{item['doctor_specialty']}</FixRow.Item>
                      <FixRow.Item>{item['check_status']}</FixRow.Item>
                      <FixRow.Item>{item['regrist_time']}</FixRow.Item>
                      <FixRow.Item>{item['remark']}</FixRow.Item>
                    </FixRow>
                  )
                })
              }
            </FixBody>
          </FixHeadList>
          <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    doctorAuditList: state.doctorAuditList
  }
}

export default connect(mapStateToProps, {fetchList})(DoctorAudit)
