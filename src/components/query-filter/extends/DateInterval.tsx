/**
 * Created by jiangyukun on 2017/8/17.
 */
import React from 'react'
import classnames from 'classnames'
import DatePicker from 'antd/lib/date-picker'

interface DateIntervalProps {
  startDate: any
  endDate: any
  onStartDateChange: (value) => void
  onEndDateChange: (value) => void
}

class DateInterval extends React.Component<DateIntervalProps> {
  handleClear = () => {
    this.props.onStartDateChange(null)
    this.props.onEndDateChange(null)
  }

  render() {
    return (
      <ul className="filter-items">
        <li className={classnames('filter-item', {'selected': this.props.startDate == null && this.props.endDate == null})}
            onClick={this.handleClear}
        >
          不限
        </li>

        <DatePicker size="small" placeholder="选择开始日期" value={this.props.startDate} onChange={v => this.props.onStartDateChange(v)}/>
        <span className="value-to-value">到</span>
        <DatePicker size="small" placeholder="选择结束日期" value={this.props.endDate} onChange={v => this.props.onEndDateChange(v)}/>
      </ul>
    )
  }
}

export default DateInterval
