/**
 * Created by jiangyukun on 2017/11/3.
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
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import EditRemark from '../../components/EditRemark'
import SelectedItem from '../../components/query-filter/SelectedItem'
import ProvinceCity from '../../components/query-filter/extends/ProvinceCity'
import FilterOptions from '../../components/query-filter/FilterOptions'

import Data from '../../core/interface/Data'
import ValueText from '../../core/interface/ValueText'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import addCommonFunction from '../../core/hoc/addCommonFunction'
import {filters} from './hospital-manage.constant'
import {handleListData, getStartEndDateStr, haveNotEmptyValue, getProvinceCityText, getYesNo} from '../common/common-helper'
import {getDateStr} from '../../core/utils/dateUtils'
import {fetchList, updateRemark} from './hospital-manage.action'
import {fetchProvinceList, fetchCityList, fetchHospitalList} from '../app.action'
import AddHospitalDialog from './dialog/AddHospitalDialog'
import {ReducerType} from '../../reducers/index'

interface HospitalManageProps extends AppFunctionPage {
  fetchProvinceList: () => void
  fetchCityList: (provinceId) => void
  fetchHospitalList: () => void
  provinceList: Data<ValueText[]>
  cityList: Data<ValueText[]>
  hospitalList: Data<ValueText[]>
  hospitalManageList: Data<any>
  updateRemark: any
  updateRemarkSuccess: boolean
  addHospitalSuccess: boolean
}

class HospitalManage extends React.Component<HospitalManageProps> {
  state = {
    currentPage: 0,
    index: -1,
    showEditRemark: false,
    showAdd: false,
    showEdit: false,

    searchKey: '',
    createStartDate: null,
    createEndDate: null,
    province: '',
    city: '',
    hospital: '',
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
      "appeal_begin_time": getDateStr(this.state.createStartDate),
      "appeal_end_time": getDateStr(this.state.createEndDate),

    })
  }

  handleProvinceChange = (v) => {
    if (v) {
      this.props.fetchCityList(v)
    }
    this.setState({province: v, city: ''})
  }

  clearAllFilter = () => {
    this.setState({
      createStartDate: null,
      createEndDate: null,
      province: '',
      city: '',
      isHide: ''
    })
  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.hospitalManageList).list[this.state.index]
    this.props.updateRemark(item['hospital_id'], newRemark)
  }

  componentDidMount() {
    if (!this.props.provinceList.loaded) {
      this.props.fetchProvinceList()
    }
    if (!this.props.hospitalList.loaded) {
      this.props.fetchHospitalList()
    }
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: HospitalManageProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('修改备注成功！')
      this.toPage()
    }
    if (!this.props.addHospitalSuccess && nextProps.addHospitalSuccess) {
      this.props.showSuccess('添加医院成功！')
      this.toPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.hospitalManageList)
    const item = list[this.state.index] || {}
    let provinceList = this.props.provinceList.data || []
    let cityList = this.props.cityList.data || []
    let hospitalList = this.props.hospitalList.data || []

    return (
      <div className="app-function-page">
        {
          this.state.showAdd && (
            <AddHospitalDialog
              onExited={() => this.setState({showAdd: false})}
            />
          )
        }
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['hospital_remark']}
              updateRemark={this.updateRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        <div className="toolbar">
          <div>
            <Button onClick={() => this.setState({showAdd: true})}>新增</Button>
            <Button disabled={this.state.index == -1} onClick={() => this.setState({showEdit: true})}>查看</Button>
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
          <FilterItem label="所在地区">
            <ProvinceCity
              provinceList={provinceList} province={this.state.province} onProvinceChange={this.handleProvinceChange}
              cityList={cityList} city={this.state.city} onCityChange={v => this.setState({city: v})}
            />
          </FilterItem>
          <FilterItem label="医院">
            <FilterOptions options={hospitalList} value={this.state.hospital} onChange={v => this.setState({hospital: v})}/>
          </FilterItem>
          <FilterItem label="创建时间">
            <DateInterval
              startDate={this.state.createStartDate} endDate={this.state.createEndDate}
              onStartDateChange={v => this.setState({createStartDate: v})} onEndDateChange={v => this.setState({createEndDate: v})}
            />
          </FilterItem>
          <FilterItem label="是否隐藏">
            <FilterOptions options={filters.isHide} value={this.state.isHide} onChange={v => this.setState({isHide: v})}/>
          </FilterItem>
          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, ['province', 'city', 'createStartDate', 'createEndDate', 'hospital', 'isHide'])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            <SelectedItem
              label="所在地区" text={getProvinceCityText(this.state.province, this.state.city, provinceList, cityList)}
              onReset={() => this.setState({province: '', city: ''})}
            />
            <SelectedItem
              label="创建时间" text={getStartEndDateStr(this.state.createStartDate, this.state.createEndDate)}
              onReset={() => this.setState({createStartDate: null, createEndDate: null})}
            />
          </SelectedFilter>
        </div>
        <FixHeadList total={total} minWidth="1200px" weights={[2, 1, 1, 2, 2, 2, 2]}>
          <FixHead>
            <FixHead.Item>医院名称</FixHead.Item>
            <FixHead.Item>省份</FixHead.Item>
            <FixHead.Item>市</FixHead.Item>
            <FixHead.Item>经度</FixHead.Item>
            <FixHead.Item>纬度</FixHead.Item>
            <FixHead.Item>创建时间</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
            <FixHead.Item>是否隐藏</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['hospital_id']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['hospital_name']}</FixRow.Item>
                    <FixRow.Item>{item['hospital_province']}</FixRow.Item>
                    <FixRow.Item>{item['hospital_city']}</FixRow.Item>
                    <FixRow.Item>{item['hospital_longitude']}</FixRow.Item>
                    <FixRow.Item>{item['hospital_dimension']}</FixRow.Item>
                    <FixRow.Item>{item['create_time']}</FixRow.Item>
                    <FixRow.Item>
                      {item['hospital_remark']}<Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                    </FixRow.Item>
                    <FixRow.Item>{getYesNo(item['is_hide'])}</FixRow.Item>
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
    provinceList: state.provinceList,
    cityList: state.cityList,
    hospitalList: state.hospitalList,
    hospitalManageList: state.hospitalManageList,
    updateRemarkSuccess: state.hospitalManage.updateRemarkSuccess,
    addHospitalSuccess: state.hospitalManage.addHospitalSuccess,
  }
}

export default connect(mapStateToProps, {fetchProvinceList, fetchCityList, fetchHospitalList, fetchList, updateRemark})(
  addCommonFunction(HospitalManage)
)
