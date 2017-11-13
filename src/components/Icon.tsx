/**
 * Created by jiangyukun on 2017/11/13.
 */
import React from 'react'

interface IconProps {
  type: string
  onClick: () => void
}

class Icon extends React.Component<IconProps> {
  render() {
    return (
      <i className={`icon-${this.props.type}`} onClick={this.props.onClick}></i>
    )
  }
}

export default Icon
