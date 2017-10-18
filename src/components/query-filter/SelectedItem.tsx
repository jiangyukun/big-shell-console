/**
 * Created by jiangyukun on 2017/4/26.
 */
import React from 'react'
import classnames from 'classnames'

interface SelectedItemProps {
  label: string,
  value: string,
  itemList: any[],
  onReset: () => void
}

class SelectedItem extends React.Component<SelectedItemProps> {
  render() {
    if (!this.props.value) {
      return null
    }
    let value = this.props.value
    if (this.props.itemList) {
      value = this.props.itemList.find(item => item.value == value).text
    }

    return (
      <a
        className={classnames('select-result select-result2 select-resultqage')}>
        <span>{this.props.label}： {value}</span>
        <i className="icon-close" onClick={this.props.onReset}></i>
      </a>
    )
  }
}

export default SelectedItem
