/**
 * Created by jiangyukun on 2017/10/31.
 */
import React from 'react'
import classnames from 'classnames'

interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  type?: string
  className?: string
  theme?: string
}

class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    type: '',
    className: ''
  }

  render() {
    let className = classnames('button', this.props.type, this.props.className)
    if (this.props.theme) {
      className = 'button__' + this.props.theme
    }
    return (
      <button className={className}
              onClick={this.props.onClick} disabled={this.props.disabled}>
        {this.props.children}
      </button>
    )
  }
}

export default Button
