/**
 * Created by jiangyukun on 2017/11/6.
 */
import React from 'react'
import {connect} from 'react-redux'

import Icon from '../../components/Icon'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import DateInterval from '../../components/query-filter/extends/DateInterval'
import FilterOptions from '../../components/query-filter/FilterOptions'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import EditRemark from '../../components/EditRemark'
import SelectedItem from '../../components/query-filter/SelectedItem'
import ConsultDetailDialog from './dialog/ConsultDetailDialog'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import addCommonFunction from '../../core/hoc/addCommonFunction'
import {filters} from './telephone-consult.constant'
import {handleListData, getStartEndDateStr, haveNotEmptyValue} from '../common/common-helper'
import {getDateStr} from '../../core/utils/dateUtils'
import {fetchList, updateRemark} from './telephone-consult.action'

interface TelephoneConsultProps extends AppFunctionPage {
  telephoneConsultList: Data<any>
  updateRemark: (orderCode, newRemark) => void
  updateRemarkSuccess: boolean
}

class TelephoneConsult extends React.Component<TelephoneConsultProps> {
  state = {
    searchKey: '',
    index: -1,
    currentPage: 0,
    showConsultDetail: false,
    showEditRemark: false,

    startDate1: null,
    endDate1: null,
    startDate2: null,
    endDate2: null,
    currentServiceStatus: '',
    paymentStatus: '',
    paymentType: '',
    isHide: ''
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "limit": 10,
      "key_words": this.state.searchKey,
      "order_begin_time": getDateStr(this.state.startDate1),
      "order_end_time": getDateStr(this.state.endDate1),
      "current_service_status": this.state.currentServiceStatus,
      "pay_status": this.state.paymentStatus,
      "pay_way": this.state.paymentType,
      "pay_begin_time": getDateStr(this.state.startDate2),
      "pay_end_time": getDateStr(this.state.endDate2),
      "is_hide": this.state.isHide
    })
  }

  clearAllFilter = () => {
    this.setState({
      startDate1: null,
      endDate1: null,
      currentServiceStatus: '',
      startDate2: null,
      endDate2: null,
      paymentStatus: '',
      paymentType: '',
      isHide: ''
    })
  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.telephoneConsultList).list[this.state.index]
    this.props.updateRemark(item['phone_order_code'], newRemark)
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: TelephoneConsultProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('更新备注成功！')
      this.toPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.telephoneConsultList)
    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page">
        {
          this.state.showConsultDetail && (
            <ConsultDetailDialog
              consultId={item['phone_order_code'] || '0217110004842'}
              onExited={() => this.setState({showConsultDetail: false})}
            />
          )
        }
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['order_remark']}
              updateRemark={this.updateRemark}
              updateRemarkSuccess={this.props.updateRemarkSuccess}
              onExited={() => this.setState({showEditRemark: false})}
            />
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
          <FilterItem size="big" label="订单时间">
            <DateInterval
              startDate={this.state.startDate1} endDate={this.state.endDate1}
              onStartDateChange={v => this.setState({startDate1: v})} onEndDateChange={v => this.setState({endDate1: v})}
            />
          </FilterItem>
          <FilterItem size="big" label="付款时间">
            <DateInterval
              startDate={this.state.startDate2} endDate={this.state.endDate2}
              onStartDateChange={v => this.setState({startDate2: v})} onEndDateChange={v => this.setState({endDate2: v})}
            />
          </FilterItem>
          <FilterItem label="当前服务状态">
            <FilterOptions options={filters.currentServiceStatus} useSelect={true} value={this.state.currentServiceStatus}
                           onChange={v => this.setState({currentServiceStatus: v})}/>
          </FilterItem>
          <FilterItem label="付款状态">
            <FilterOptions options={filters.paymentStatus} value={this.state.paymentStatus} onChange={v => this.setState({paymentStatus: v})}/>
          </FilterItem>
          <FilterItem label="支付方式">
            <FilterOptions options={filters.paymentType} value={this.state.paymentType} onChange={v => this.setState({paymentType: v})}/>
          </FilterItem>
          <FilterItem label="是否隐藏">
            <FilterOptions options={filters.isHide} value={this.state.isHide} onChange={v => this.setState({isHide: v})}/>
          </FilterItem>
          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, ['startDate1', 'endDate1', 'startDate2', 'endDate2', 'currentServiceStatus', 'paymentStatus', 'paymentType', 'isHide'])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            <SelectedItem
              label="订单时间" text={getStartEndDateStr(this.state.startDate1, this.state.endDate1)}
              onReset={() => this.setState({startDate1: null, endDate1: null})}
            />
            <SelectedItem
              label="付款时间" text={getStartEndDateStr(this.state.startDate2, this.state.endDate2)}
              onReset={() => this.setState({startDate2: null, endDate2: null})}
            />
            <SelectedItem
              label="当前服务状态" value={this.state.currentServiceStatus} options={filters.currentServiceStatus}
              onReset={() => this.setState({currentServiceStatus: ''})}
            />
            <SelectedItem
              label="付款状态" value={this.state.paymentStatus} options={filters.paymentStatus}
              onReset={() => this.setState({paymentStatus: ''})}
            />
            <SelectedItem
              label="支付方式" value={this.state.paymentType} options={filters.paymentType}
              onReset={() => this.setState({paymentType: ''})}
            />
            <SelectedItem
              label="是否隐藏" value={this.state.isHide} options={filters.isHide}
              onReset={() => this.setState({isHide: ''})}
            />
          </SelectedFilter>
        </div>
        <FixHeadList total={total} minWidth="2000px">
          <FixHead>
            <FixHead.Item>订单编号</FixHead.Item>
            <FixHead.Item>患者编号</FixHead.Item>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>真实姓名</FixHead.Item>
            <FixHead.Item>咨询内容</FixHead.Item>
            <FixHead.Item>期望时间</FixHead.Item>
            <FixHead.Item>订单时间</FixHead.Item>
            <FixHead.Item>咨询对象</FixHead.Item>
            <FixHead.Item>当前服务状态</FixHead.Item>
            <FixHead.Item>付款状态</FixHead.Item>
            <FixHead.Item>付款金额</FixHead.Item>
            <FixHead.Item>付款时间</FixHead.Item>
            <FixHead.Item>用户评分</FixHead.Item>
            <FixHead.Item>评价内容</FixHead.Item>
            <FixHead.Item>评价时间</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
            <FixHead.Item>是否隐藏</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['phone_order_code']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['phone_order_code']}</FixRow.Item>
                    <FixRow.Item>{item['patient_code']}</FixRow.Item>
                    <FixRow.Item>{item['user_account']}</FixRow.Item>
                    <FixRow.Item>{item['real_name']}</FixRow.Item>
                    <FixRow.Item>{item['']}</FixRow.Item>
                    <FixRow.Item>{item['expect_time']}</FixRow.Item>
                    <FixRow.Item>{item['order_time']}</FixRow.Item>
                    <FixRow.Item>{item['doctor_name']}</FixRow.Item>
                    <FixRow.Item>{item['current_service_status']}</FixRow.Item>
                    <FixRow.Item>{item['pay_status']}</FixRow.Item>
                    <FixRow.Item>{item['pay_money']}</FixRow.Item>
                    <FixRow.Item>{item['pay_time']}</FixRow.Item>
                    <FixRow.Item>{item['evaluate_store']}</FixRow.Item>
                    <FixRow.Item>{item['evaluate_content']}</FixRow.Item>
                    <FixRow.Item>{item['evaluate_time']}</FixRow.Item>
                    <FixRow.Item>
                      {item['order_remark']}
                      <Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                    </FixRow.Item>
                    <FixRow.Item>{item['is_hide']}</FixRow.Item>
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
    updateRemarkSuccess: state.telephoneConsult.updateRemarkSuccess,
    telephoneConsultList: state.telephoneConsultList
  }
}

export default connect(mapStateToProps, {fetchList, updateRemark})(
  addCommonFunction(TelephoneConsult)
)
