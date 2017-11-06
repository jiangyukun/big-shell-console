/**
 * Created by jiangyukun on 2017/10/31.
 */
import React from 'react'
import classnames from 'classnames'

interface ButtonProps {
  onClick?: () => void
  type?: string
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button className={classnames('button', this.props.type || '')} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
}

export default Button
