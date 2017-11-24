/**
 * Created by jiangyukun on 2017/11/3.
 */
import React from 'react'
import {connect} from 'react-redux'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import SearchBox from '../../components/search/SearchBox'
import Button from '../../components/button/Button'
import UpdateDoctorDialog from './dialog/UpdateDoctorDialog'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {ReducerType} from '../../reducers/index'
import {handleListData} from '../common/common-helper'
import {fetchList, updateRemark} from './doctor-audit.action'
import {DoctorAuditItem} from './interface/DoctorAudit'
import Icon from '../../components/Icon'
import EditRemark from '../../components/EditRemark'
import addCommonFunction from '../../core/hoc/addCommonFunction'

interface DoctorAuditProps extends AppFunctionPage {
  doctorAuditList: Data<any>
  updateRemark: (id, remark) => void
  updateRemarkSuccess: boolean
}

class DoctorAudit extends React.Component<DoctorAuditProps> {
  state = {
    searchKey: '',
    index: -1,
    currentPage: 0,
    showEdit: false,
    showEditRemark: false
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList(newPage, 10, this.state.searchKey)
  }

  refreshPage = () => {
    this.toPage(0)
  }

  updateRemark = (newRemark) => {
    let id = handleListData(this.props.doctorAuditList).list[this.state.index].id
    this.props.updateRemark(id, newRemark)
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: DoctorAuditProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('更新备注成功！')
      this.toPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.doctorAuditList)
    const item: DoctorAuditItem = list[this.state.index] || {}

    return (
      <div className="app-function-page">
        {
          this.state.showEdit && (
            <UpdateDoctorDialog
              doctor={item}
              onExited={() => this.setState({showEdit: false})}
            />
          )
        }
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item.remark}
              updateRemark={this.updateRemark}
              updateRemarkSuccess={this.props.updateRemarkSuccess}
              onExited={() => this.setState({showEditRemark: false})}
            />
          )
        }
        <div className="toolbar">
          <div>
            <Button onClick={() => this.setState({showEdit: true})} disabled={this.state.index == -1}>查看/修改</Button>
          </div>
          <SearchBox
            placeholder="输入手机号码、编号查询"
            searchKey={this.state.searchKey}
            onChange={v => this.setState({searchKey: v})}
            onSearch={this.refreshPage}
          />
        </div>
        <FixHeadList total={total}>
          <FixHead>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>医生姓名</FixHead.Item>
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
              list.map((item: DoctorAuditItem, index) => {
                return (
                  <FixRow key={item.id}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}>
                    <FixRow.Item>{item.mobile}</FixRow.Item>
                    <FixRow.Item>{item.doctorName}</FixRow.Item>
                    <FixRow.Item>{item.hospital}</FixRow.Item>
                    <FixRow.Item>{item.position}</FixRow.Item>
                    <FixRow.Item>{item.pictureUrl}</FixRow.Item>
                    <FixRow.Item>{item.codeNumber}</FixRow.Item>
                    <FixRow.Item>{item.speciality}</FixRow.Item>
                    <FixRow.Item>{item.auditStatus}</FixRow.Item>
                    <FixRow.Item>{item.createDateTime}</FixRow.Item>
                    <FixRow.Item>{item.remark}<Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/></FixRow.Item>
                  </FixRow>
                )
              })
            }
          </FixBody>
        </FixHeadList>
        <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
      </div>
    )
  }
}

function mapStateToProps(state: ReducerType) {
  return {
    doctorAuditList: state.doctorAuditList,
    positionList: state.positionList,
    updateRemarkSuccess: state.doctorAudit.updateRemarkSuccess
  }
}

export default connect(mapStateToProps, {fetchList, updateRemark})(addCommonFunction(DoctorAudit))
