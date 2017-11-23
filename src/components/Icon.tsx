/**
 * Created by jiangyukun on 2017/11/13.
 */
import React from 'react'

interface IconProps {
  type: string
  onClick: () => void
  style?: any
}

class Icon extends React.Component<IconProps> {
  render() {
    return (
      <i className={`icon-${this.props.type}`} onClick={this.props.onClick} style={this.props.style}></i>
    )
  }
}

export default Icon
