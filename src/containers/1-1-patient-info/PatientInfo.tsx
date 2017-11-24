/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'
import {connect} from 'react-redux'

import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import DateInterval from '../../components/query-filter/extends/DateInterval'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import ProvinceCity from '../../components/query-filter/extends/ProvinceCity'

import Data from '../../core/interface/Data'
import ValueText from '../../core/interface/ValueText'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {filters} from './patient-info'
import {handleListData} from '../common/common-helper'
import {fetchProvinceList, fetchCityList} from '../app.action'
import {fetchList} from './patient-info.action'
import {ReducerType} from '../../reducers/index'

interface PatientInfoProps extends AppFunctionPage {
  fetchProvinceList: () => void
  fetchCityList: (provinceId) => void
  patientInfoList: Data<any>
  provinceList: Data<ValueText[]>
  cityList: Data<ValueText[]>
}

class PatientInfo extends React.Component<PatientInfoProps> {
  state = {
    index: -1,
    currentPage: 0,

    sex: '',
    province: '',
    city: '',
    createStartDate: null,
    createEndDate: null,
    lastLoginStartDate: null,
    lastLoginEndDate: null,
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      start: 0,
      rows: 10
    })
  }

  handleProvinceChange = (newProvinceId) => {
    if (newProvinceId) {
      this.props.fetchCityList(newProvinceId)
    }
    this.setState({province: newProvinceId, city: ''})
  }

  componentDidMount() {
    this.toPage(0)
    if (!this.props.provinceList.loaded) {
      this.props.fetchProvinceList()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.patientInfoList)

    return (
      <div className="app-function-page">
        <div className="query-filter">
          <FilterItem label="性别">
            <FilterOptions options={filters.sex} value={this.state.sex} onChange={v => this.setState({sex: v})}/>
          </FilterItem>
          <FilterItem label="所在地区">
            <ProvinceCity
              province={this.state.province} city={this.state.city}
              provinceList={this.props.provinceList.data || []} cityList={this.props.cityList.data || []}
              onProvinceChange={this.handleProvinceChange} onCityChange={v => this.setState({city: v})}
            />
          </FilterItem>
          <FilterItem label="注册日期">
            <DateInterval
              startDate={null}
              endDate={null}
              onStartDateChange={() => null}
              onEndDateChange={() => null}
            />
          </FilterItem>
          <FilterItem label="最近登录日期">
            <DateInterval
              startDate={null}
              endDate={null}
              onStartDateChange={() => null}
              onEndDateChange={() => null}
            />
          </FilterItem>
        </div>

        <FixHeadList total={total}>
          <FixHead>
            <FixHead.Item>患者编号</FixHead.Item>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>昵称</FixHead.Item>
            <FixHead.Item>头像</FixHead.Item>
            <FixHead.Item>真实姓名</FixHead.Item>
            <FixHead.Item>性别</FixHead.Item>
            <FixHead.Item>出生日期</FixHead.Item>
            <FixHead.Item>所在地区</FixHead.Item>
            <FixHead.Item>注册日期</FixHead.Item>
            <FixHead.Item>登录机型</FixHead.Item>
            <FixHead.Item>系统</FixHead.Item>
            <FixHead.Item>登录时间</FixHead.Item>
            <FixHead.Item>APP版本</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['patient_user_id']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}>
                    <FixRow.Item>{item['patient_code']}</FixRow.Item>
                    <FixRow.Item>{item['patient_phone']}</FixRow.Item>
                    <FixRow.Item>{item['nick_name']}</FixRow.Item>
                    <FixRow.Item>{item['photo_url']}</FixRow.Item>
                    <FixRow.Item>{item['real_name']}</FixRow.Item>
                    <FixRow.Item>{item['sex']}</FixRow.Item>
                    <FixRow.Item>{item['birth_time']}</FixRow.Item>
                    <FixRow.Item>{item['location']}</FixRow.Item>
                    <FixRow.Item>{item['register_time']}</FixRow.Item>
                    <FixRow.Item>{item['device_model']}</FixRow.Item>
                    <FixRow.Item>{item['device_system']}</FixRow.Item>
                    <FixRow.Item>{item['lasted_login_time']}</FixRow.Item>
                    <FixRow.Item>{item['app_version']}</FixRow.Item>
                    <FixRow.Item>{item['remark']}</FixRow.Item>
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
    patientInfoList: state.patientInfoList,
    provinceList: state.provinceList,
    cityList: state.cityList,
  }
}

export default connect(mapStateToProps, {fetchProvinceList, fetchCityList, fetchList})(PatientInfo)
