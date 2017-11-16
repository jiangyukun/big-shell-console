/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import classnames from 'classnames'
import Select1 from 'app-core/common/Select1'

import ValueText from '../../../core/interface/ValueText'

interface ProvinceCityProps {
  province: string
  city: string
  provinceList: ValueText[]
  cityList: ValueText[]
  onProvinceChange: (value) => void
  onCityChange: (value) => void
}

class ProvinceCity extends React.Component<ProvinceCityProps> {
  handleClear = () => {
    if (this.props.province != '') {
      this.props.onProvinceChange('')
    }
    if (this.props.city != '') {
      this.props.onCityChange('')
    }
  }

  render() {
    return (
      <ul className="filter-items">
        <li className={classnames('filter-item', {'selected': this.props.province == '' && this.props.city == ''})}
            onClick={this.handleClear}
        >
          不限
        </li>

        <li className="filter-select-item filter-item">
          <Select1
            placeholder="请选择省"
            className={classnames('small', {'selected': this.props.province != ''})}
            options={this.props.provinceList}
            value={this.props.province}
            onChange={value => this.props.onProvinceChange(value)}
          />
        </li>
        <li className="filter-select-item filter-item">
          <Select1
            placeholder="请选择市"
            className={classnames('small', {'selected': this.props.city != ''})}
            options={this.props.cityList}
            value={this.props.city}
            onChange={value => this.props.onCityChange(value)}
          />
        </li>
      </ul>
    )
  }
}

export default ProvinceCity
