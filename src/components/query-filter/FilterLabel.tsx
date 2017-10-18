/**
 * Created by jiangyukun on 2017/8/17.
 */
import React from 'react'

interface FilterLabelProps {
  label: string
  width?: string
}

class FilterLabel extends React.Component<FilterLabelProps> {
  render() {
    let style: any = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    return (
      <div className="filter-item-label">
        <label style={style}>{this.props.label}：</label>
      </div>
    )
  }
}

export default FilterLabel
