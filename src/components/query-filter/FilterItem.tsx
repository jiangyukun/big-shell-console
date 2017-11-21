/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React from 'react'
import {merge} from 'lodash'
import classnames from 'classnames'

import FilterLabel from './FilterLabel'

interface FilterItemProps {
  label: string
  className?: string
  size?: 'small' | 'middle' | 'big'
  style?: any
}

class FilterItem extends React.Component<FilterItemProps> {
  static defaultProps = {
    size: 'middle'
  }

  render() {
    return (
      <div className={classnames('filter-item-container', this.props.size, this.props.className)} style={this.props.style}>
        <FilterLabel label={this.props.label}/>
        <div className="filter-item-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default FilterItem
