/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import classnames from 'classnames'
import Select1 from 'app-core/common/Select1'

import ValueText from '../../../core/interface/ValueText'

interface HospitalSelectProps {
  options: ValueText[]
  value: string
  onValueChange: (value: string) => void
  text: string
  onTextChange: (text) => void
}

class HospitalSelect extends React.Component<HospitalSelectProps> {
  selectHospital = (value) => {
    this.props.onValueChange(value)
    this.props.onTextChange('')
  }

  handleHospitalTextChange = (e) => {
    if (this.props.value != '') {
      this.props.onValueChange('')
    }
    this.props.onTextChange(e.target.value)
  }

  handleClear = () => {
    this.props.onValueChange('')
    this.props.onTextChange('')
  }

  render() {
    return (
      <ul className="filter-items">
        <li className={classnames('filter-item', {'selected': this.props.value == '' && this.props.text == ''})}
            onClick={this.handleClear}
        >
          不限
        </li>

        <li className="filter-select-item filter-item">
          <Select1
            placeholder="请选择医院"
            className={classnames('small', {'selected': this.props.value != ''})}
            options={this.props.options}
            value={this.props.value}
            onChange={this.selectHospital}
          />
        </li>
        <input className="hospital-filter-input" value={this.props.text} onChange={this.handleHospitalTextChange}/>
      </ul>
    )
  }
}

export default HospitalSelect
