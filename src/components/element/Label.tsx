/**
 * Created by jiangyukun on 2017/11/2.
 */
import React from 'react'

interface LabelProps {
  necessary?: boolean
}

class Label extends React.Component<LabelProps> {
  render() {
    return (
      <label className="app-label">
        {this.props.children}
        {this.props.necessary && (
          <span className="label-necessary">*</span>
        )}
        ：
      </label>
    )
  }
}

export default Label
