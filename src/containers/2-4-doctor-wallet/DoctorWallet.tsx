/**
 * Created by jiangyukun on 2017/11/22.
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
import {handleListData, haveNotEmptyValue} from '../common/common-helper'
import {filters} from './doctor-wallet.constant'
import {fetchList, updateRemark} from './doctor-wallet.action'
import {fetchHospitalList} from '../app.action'

interface DoctorWalletProps extends AppFunctionPage {
  fetchHospitalList: () => void
  hospitalList: Data<any>
  doctorWalletList: Data<any>
  updateRemark: any
  updateRemarkSuccess: boolean
}

class DoctorWallet extends React.Component<DoctorWalletProps> {
  state = {
    currentPage: 0,
    index: -1,
    showEditRemark: false,

    searchKey: '',
    hospitalId: '',
    hospitalText: '',
    department: ''
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "rows": 10,
      "doctor_phone": this.state.searchKey,
      "hospital_id": this.state.hospitalId,
      "hospital_name": this.state.hospitalText,

    })
  }

  clearAllFilter = () => {
    this.setState({
      searchKey: '',
      takeMedicine: '',
      week: '',
      patientConditionStatus: ''
    })
  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.doctorWalletList).list[this.state.index]
    this.props.updateRemark(item['order_code'], item['order_type'], newRemark)
  }

  componentDidMount() {
    if (!this.props.hospitalList.loaded) {
      this.props.fetchHospitalList()
    }
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.doctorWalletList)
    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page">
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['appeal_remark']}
              updateRemark={this.updateRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({showEditRemark: false})}/>
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
          <FilterItem label="医院" style={{width: '500px'}}>
            <HospitalSelect
              options={this.props.hospitalList.data || []}
              value={this.state.hospitalId} onValueChange={v => this.setState({hospitalId: v})}
              text={this.state.hospitalText} onTextChange={v => this.setState({hospitalText: v})}
            />
          </FilterItem>
          <FilterItem label="医院" style={{width: '500px'}}>
            <FilterOptions options={filters.department} value={this.state.department} onChange={v => this.setState({department: v})}/>
          </FilterItem>

          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, [])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            <SelectedItem
              label="科室" value={this.state.department} options={filters.department}
              onReset={() => this.setState({department: ''})}
            />

          </SelectedFilter>
        </div>
        <FixHeadList total={total} minWidth="2200px">
          <FixHead>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>医生姓名</FixHead.Item>
            <FixHead.Item>医院</FixHead.Item>
            <FixHead.Item>可提现金额</FixHead.Item>
            <FixHead.Item>未记收益金额</FixHead.Item>
            <FixHead.Item>已提现金额</FixHead.Item>
            <FixHead.Item>未处理提现申请</FixHead.Item>
            <FixHead.Item>已处理提现申请</FixHead.Item>
            <FixHead.Item>问答收费是否开启</FixHead.Item>
            <FixHead.Item>咨询收费</FixHead.Item>
            <FixHead.Item>已回答次数</FixHead.Item>
            <FixHead.Item>问答收益</FixHead.Item>
            <FixHead.Item>问答评分</FixHead.Item>
            <FixHead.Item>咨询收费是否开启</FixHead.Item>
            <FixHead.Item>咨询收费</FixHead.Item>
            <FixHead.Item>已咨询次数</FixHead.Item>
            <FixHead.Item>咨询收益</FixHead.Item>
            <FixHead.Item>咨询评分</FixHead.Item>
            <FixHead.Item>可咨询时间</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={index}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['doctor_account']}</FixRow.Item>
                    <FixRow.Item>{item['doctor_name']}</FixRow.Item>
                    <FixRow.Item>{item['hospital_name']}</FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
                    <FixRow.Item></FixRow.Item>
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
    updateRemarkSuccess: state.doctorWallet.updateRemarkSuccess,
    doctorWalletList: state.doctorWalletList
  }
}

export default connect(mapStateToProps, {fetchHospitalList, fetchList, updateRemark})(
  addCommonFunction(DoctorWallet)
)
