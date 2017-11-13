/**
 * Created by jiangyukun on 2017/11/13.
 */
import React from 'react'

interface PartContentProps {
  status: boolean
  noDataTxt: string
}

class PartContent extends React.Component<PartContentProps> {
  render() {
    if (this.props.status) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
    return (
      <div className="no-data">{this.props.noDataTxt}</div>
    )
  }
}

export default PartContent
