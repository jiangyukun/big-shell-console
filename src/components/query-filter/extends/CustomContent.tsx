/**
 * Created by jiangyukun on 2017/11/21.
 */
import React from 'react'
import classnames from 'classnames'

interface CustomContentProps {
  value: string
  onChange: (value) => void
  unit?: string
  placeholder?: string
}

class CustomContent extends React.Component<CustomContentProps> {
  render() {
    return (
      <ul className="filter-items">
        <li className={classnames('filter-item', {'selected': this.props.value == ''})}
            onClick={() => this.props.onChange('')}
        >
          不限
        </li>

        <input className="custom-content-input number"
               placeholder={this.props.placeholder}
               value={this.props.value} onChange={e => this.props.onChange(e.target.value)}/>
        <span className="unit">
          {this.props.unit}
        </span>
      </ul>
    )
  }
}

export default CustomContent
