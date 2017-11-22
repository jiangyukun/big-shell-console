/**
 * Created by jiangyukun on 2017/10/27.
 */
import React from 'react'
import {connect} from 'react-redux'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import SelectedItem from '../../components/query-filter/SelectedItem'
import LookSheetDialog from './dialog/LookSheetDialog'

import Data from '../../core/interface/Data'
import {PatientSheet} from './interface/Sheet'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {filters, SHEET_TYPE_MAPPER} from './laboratory-sheet.constant'
import {handleListData, haveNotEmptyValue} from '../common/common-helper'
import {fetchList} from './laboratory-sheet.action'

interface LaboratorySheetProps extends AppFunctionPage {
  laboratorySheetList: Data<PatientSheet[]>
}

class LaboratorySheet extends React.Component<LaboratorySheetProps> {
  type: string
  state = {
    index: -1,
    currentPage: 0,
    showSheetCategoryList: true,
    searchKey: '',
    haveUnRecord: ''
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      start: newPage,
      limit: 10
    })
  }

  refreshPage = () => {
    this.toPage(0)
  }

  clearAllFilters = () => {

  }

  handleAmountClick = (index, type) => {
    this.type = type
    this.setState({index, showSheetCategoryList: true})
  }

  componentDidMount() {
    this.toPage(0)
  }

  getAmount(amount, index, type) {
    if (amount == 0) {
      return <span>0</span>
    }
    return (
      <a onClick={() => this.handleAmountClick(index, type)}>{amount}</a>
    )
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.laboratorySheetList)
    const item: PatientSheet = list[this.state.index] || {}

    return (
      <div className="app-function-page laboratory-sheet">
        {
          this.state.showSheetCategoryList && (
            <LookSheetDialog
              mobile={item.mobile || '18920092760'}
              type={this.type || '7'}
              patient={item}
              onExited={() => this.setState({showSheetCategoryList: false})}
            />
          )
        }
        <div className="toolbar">
          <div></div>
          <SearchBox
            placeholder="输入手机号码、编号查询"
            searchKey={this.state.searchKey}
            onChange={v => this.setState({searchKey: v})}
            onSearch={this.refreshPage}
          />
        </div>
        <div className="query-filter">
          <FilterItem label="是否有未录入">
            <FilterOptions options={filters.haveUnRecord} value={this.state.haveUnRecord} onChange={v => this.setState({haveUnRecord: v})}/>
          </FilterItem>
          <SelectedFilter notEmpty={haveNotEmptyValue(this.state, ['haveUnRecord'])} clearAll={this.clearAllFilters} beginFilter={this.refreshPage}>
            <SelectedItem label="是否有未录入" onReset={() => this.setState({haveUnRecord: ''})} value={this.state.haveUnRecord} options={filters.haveUnRecord}/>
          </SelectedFilter>
        </div>
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
              list.map((item: PatientSheet, index) => {
                return (
                  <FixRow key={item.id}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}>
                    <FixRow.Item>{item.patientCode}</FixRow.Item>
                    <FixRow.Item>{item.mobile}</FixRow.Item>
                    <FixRow.Item>{item.username}</FixRow.Item>
                    <FixRow.Item>{item.remark}</FixRow.Item>
                    <FixRow.Item>{this.getAmount(item.consoleUpload, index, SHEET_TYPE_MAPPER.console)}</FixRow.Item>
                    <FixRow.Item>{this.getAmount(item.doctorUpload, index, SHEET_TYPE_MAPPER.doctor)}</FixRow.Item>
                    <FixRow.Item>{this.getAmount(item.patientUpload, index, SHEET_TYPE_MAPPER.patient)}</FixRow.Item>
                    <FixRow.Item>{this.getAmount(item.haveRecorded, index, SHEET_TYPE_MAPPER.recorded)}</FixRow.Item>
                    <FixRow.Item>{this.getAmount(item.unRecord, index, SHEET_TYPE_MAPPER.un_record)}</FixRow.Item>
                    <FixRow.Item>{this.getAmount(item.invalid, index, SHEET_TYPE_MAPPER.invalid)}</FixRow.Item>
                    <FixRow.Item>{this.getAmount(item.deleted, index, SHEET_TYPE_MAPPER.deleted)}</FixRow.Item>
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
    laboratorySheetList: state.laboratorySheetList
  }
}

export default connect(mapStateToProps, {fetchList})(LaboratorySheet)
