/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'

import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'

import {filters} from './patient-info'
import DateInterval from '../../components/query-filter/extends/DateInterval'

interface PatientInfoProps {

}

class PatientInfo extends React.Component<PatientInfoProps> {
  state = {
    sex: '',
    area: ''
  }

  render() {
    return (
      <div>
        <div className="query-filter">
          <FilterItem label="性别">
            <FilterOptions options={filters.sex} value={this.state.sex} onChange={v => this.setState({sex: v})}/>
          </FilterItem>
          <FilterItem label="所在地区">
            <FilterOptions
              useSelect={true}
              options={filters.provinces} value={this.state.area} onChange={v => this.setState({area: v})}
            />
          </FilterItem>
          <FilterItem label="注册日期" size="big">
            <DateInterval
              startDate={null}
              endDate={null}
              onStartDateChange={() => null}
              onEndDateChange={() => null}
            />
          </FilterItem>
          <FilterItem label="最近登录日期" size="big">
            <DateInterval
              startDate={null}
              endDate={null}
              onStartDateChange={() => null}
              onEndDateChange={() => null}
            />
          </FilterItem>
        </div>
      </div>
    )
  }
}

export default PatientInfo
