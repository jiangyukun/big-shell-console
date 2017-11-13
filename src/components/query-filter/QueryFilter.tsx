/**
 * Created by jiangyukun on 2017/11/13.
 */
import React from 'react'

import SelectedFilter from './SelectedFilter'

interface QueryFilterProps {
  beginFilter: () => void
}

class QueryFilter extends React.Component<QueryFilterProps> implements React.ChildContextProvider<any> {
  list = []

  addFilterItem = (filterItem) => {
    this.list.push(filterItem)
  }

  clearAll = () => {
    this.list.forEach(item => item.onReset())
  }

  render() {
    return (
      <div className="query-filter">
        {this.props.children}
        <SelectedFilter notEmpty={false} beginFilter={this.props.beginFilter} clearAll={this.clearAll}>
          {
            this.list.map((filterItem, index) => {
              return filterItem.renderIfCondition()
            })
          }
        </SelectedFilter>
      </div>
    )
  }

  getChildContext() {
    return {
      addFilterItem: this.addFilterItem
    }
  }

}

export default QueryFilter
