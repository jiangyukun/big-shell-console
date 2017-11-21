/**
 * Created by jiangyukun on 2017/11/21.
 */
import React from 'react'
import {connect} from 'react-redux'

import Icon from '../../components/Icon'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import EditRemark from '../../components/EditRemark'
import SelectedItem from '../../components/query-filter/SelectedItem'
import HospitalSelect from '../../components/query-filter/extends/HospitalSelect'
import DateInterval from '../../components/query-filter/extends/DateInterval'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import addCommonFunction from '../../core/hoc/addCommonFunction'
import {fetchList, updateRemark} from './follow-apply.action'
import {handleListData, haveNotEmptyValue} from '../common/common-helper'
import {filters} from './follow-apply.constant'
import {fetchHospitalList} from '../app.action'

interface FollowApplyProps extends AppFunctionPage {
  fetchHospitalList: () => void
  hospitalList: Data<any>
  followApplyList: Data<any>
  updateRemark: any
  updateRemarkSuccess: boolean
}

class FollowApply extends React.Component<FollowApplyProps> {
  state = {
    currentPage: 0,
    index: -1,
    showEditRemark: false,

    searchKey: '',
    applyStatus: '',
    applyStartDate: null,
    applyEndDate: null,
    hospitalId: '',
    hospitalText: ''
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "rows": 10,
      "search_key": this.state.searchKey,
    })
  }

  clearAllFilter = () => {
    this.setState({
      applyStatus: '',
      applyStartDate: null,
      applyEndDate: null,
      hospitalId: '',
      hospitalText: ''
    })
  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.followApplyList).list[this.state.index]
    this.props.updateRemark(item['order_code'], item['order_type'], newRemark)
  }

  componentDidMount() {
    if (!this.props.hospitalList.loaded) {
      this.props.fetchHospitalList()
    }
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.followApplyList)
    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page">
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['appeal_remark']}
              updateRemark={this.updateRemark}
              updateRemarkSuccess={this.props.updateRemarkSuccess}
              onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        <div className="toolbar">
          <div>
            <Button disabled={this.state.index == -1} onClick={() => this.setState({showConsultDetail: true})}>查看</Button>
          </div>
          <div>
            <SearchBox label="患者" placeholder="输入手机号码、编号查询"
                       searchKey={this.state.searchKey} onChange={v => this.setState({searchKey: v})}
                       onSearch={() => this.toPage(0)}
            />
            <Button>导出到Excel</Button>
          </div>
        </div>
        <div className="query-filter">
          <FilterItem label="申请状态">
            <FilterOptions
              options={filters.applyStatus} value={this.state.applyStatus}
              onChange={v => this.setState({applyStatus: v})}/>
          </FilterItem>
          <FilterItem label="申请时间">
            <DateInterval
              startDate={this.state.applyStartDate} endDate={this.state.applyEndDate}
              onStartDateChange={v => this.setState({applyStartDate: v})} onEndDateChange={v => this.setState({applyEndDate: v})}
            />
          </FilterItem>

          <FilterItem label="医院" style={{width: '500px'}}>
            <HospitalSelect
              options={this.props.hospitalList.data || []}
              value={this.state.hospitalId} onValueChange={v => this.setState({hospitalId: v})}
              text={this.state.hospitalText} onTextChange={v => this.setState({hospitalText: v})}
            />
          </FilterItem>

          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, [])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            <SelectedItem
              label="申请状态" value={this.state.applyStatus} options={filters.applyStatus}
              onReset={() => this.setState({takeMedicine: ''})}
            />

          </SelectedFilter>
        </div>
        <FixHeadList total={total} weights={[]}>
          <FixHead>
            <FixHead.Item>患者编号</FixHead.Item>
            <FixHead.Item>真实姓名</FixHead.Item>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>医生姓名</FixHead.Item>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>医院</FixHead.Item>
            <FixHead.Item>申请状态</FixHead.Item>
            <FixHead.Item>申请时间</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['attention_info_id']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['patient_code']}</FixRow.Item>
                    <FixRow.Item>{item['patient_real_name']}</FixRow.Item>
                    <FixRow.Item>{item['patient_phone']}</FixRow.Item>
                    <FixRow.Item>{item['doctor_real_name']}</FixRow.Item>
                    <FixRow.Item>{item['doctor_phone']}</FixRow.Item>
                    <FixRow.Item>{item['hospital_name']}</FixRow.Item>
                    <FixRow.Item>{item['attention_status']}</FixRow.Item>
                    <FixRow.Item>{item['create_time']}</FixRow.Item>
                    <FixRow.Item>
                      {item['appeal_remark']}<Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                    </FixRow.Item>
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

function mapStateToProps(state) {
  return {
    hospitalList: state.hospitalList,
    updateRemarkSuccess: state.followApply.updateRemarkSuccess,
    followApplyList: state.followApplyList
  }
}

export default connect(mapStateToProps, {fetchHospitalList, fetchList, updateRemark})(
  addCommonFunction(FollowApply)
)
