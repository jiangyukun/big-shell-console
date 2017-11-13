/**
 * Created by jiangyukun on 2017/4/26.
 */
import React from 'react'
import Icon from '../Icon'

interface SelectedItemProps {
  label: string
  value?: string
  text?: string
  options?: any[]
  onReset: () => void
}

class SelectedItem extends React.Component<SelectedItemProps> {
  render() {
    if (!this.props.value && !this.props.text) return null

    let text = this.props.text
    if (!text) {
      if (this.props.value && this.props.options) {
        let match = this.props.options.find(item => item.value == this.props.value)
        if (match) {
          text = match.text
        }
      }
    }

    return (
      <span className="selected-fitler-item">
        <span>
          <span className="item-label">{this.props.label}：</span>
          <span className="item-value">{text}</span>
          </span>
        <Icon type="remove-filter-item" onClick={this.props.onReset}></Icon>
      </span>
    )
  }
}

export default SelectedItem
