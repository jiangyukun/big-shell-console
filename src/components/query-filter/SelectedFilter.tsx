/**
 * Created by jiangyukun on 2017/4/26.
 */
import React from 'react'
import classnames from 'classnames'
import Button from '../button/Button'

interface SelectedFilterProps {
  notEmpty: boolean
  clearAll: () => void
  beginFilter: () => void
}

class SelectedFilter extends React.Component<SelectedFilterProps> {
  render() {
    return (
      <div className="selected-filter">
        <div style={{width: '80px'}}>筛选条件:</div>
        <div className="flex1 ">
          {this.props.children}
        </div>
        <div className="select-result">
          <Button
            className={classnames('clear', {'disabled': !this.props.notEmpty})}
            onClick={this.props.clearAll}
            disabled={!this.props.notEmpty}>
            清除
          </Button>
          <Button className="submit" onClick={this.props.beginFilter}>确定</Button>
        </div>
        <div className="clear disabled"></div>
      </div>
    )
  }
}

export default SelectedFilter
