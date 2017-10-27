/**
 * Created by jiangyukun on 2017/10/27.
 */
import React from 'react'
import {connect} from 'react-redux'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {fetchList} from './laboratory-sheet.action'
import {handleListData} from '../common/common-helper'

interface LaboratorySheetProps extends AppFunctionPage {
  laboratorySheetList: Data<any>
}

class LaboratorySheet extends React.Component<LaboratorySheetProps> {
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
    this.props.fetchList({
      start: 0,
      limit: 20
    })
  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.laboratorySheetList)

    return (
      <div className="app-function-page">
        <div className="list-wrap">
          <FixHeadList total={total}>
            <FixHead>
              <FixHead.Item>患者编号</FixHead.Item>
              <FixHead.Item>手机号码</FixHead.Item>
              <FixHead.Item>真实姓名</FixHead.Item>
              <FixHead.Item>备注</FixHead.Item>
              <FixHead.Item>后台上传</FixHead.Item>
              <FixHead.Item>医生上传</FixHead.Item>
              <FixHead.Item>患者上传</FixHead.Item>
              <FixHead.Item>已录入</FixHead.Item>
              <FixHead.Item>未录入</FixHead.Item>
              <FixHead.Item>无效</FixHead.Item>
              <FixHead.Item>已删除</FixHead.Item>
            </FixHead>
            <FixBody>
              {
                list.map((item, index) => {
                  return (
                    <FixRow key={item['assay_id']}
                            onClick={() => this.setState({index})}
                            selected={this.state.index == index}>
                      <FixRow.Item>{item['patient_code']}</FixRow.Item>
                      <FixRow.Item>{item['user_account']}</FixRow.Item>
                      <FixRow.Item>{item['real_name']}</FixRow.Item>
                      <FixRow.Item>{item['remark']}</FixRow.Item>
                      <FixRow.Item>{item['backend_upload_count']}</FixRow.Item>
                      <FixRow.Item>{item['doctor_upload_count']}</FixRow.Item>
                      <FixRow.Item>{item['patient_upload_count']}</FixRow.Item>
                      <FixRow.Item>{item['is_input_count']}</FixRow.Item>
                      <FixRow.Item>{item['is_no_input_count']}</FixRow.Item>
                      <FixRow.Item>{item['invalid_count']}</FixRow.Item>
                      <FixRow.Item>{item['delete_list_count']}</FixRow.Item>
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
    laboratorySheetList: state.laboratorySheetList
  }
}

export default connect(mapStateToProps, {fetchList})(LaboratorySheet)
