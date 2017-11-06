/**
 * Created by jiangyukun on 2017/10/27.
 */
import React from 'react'
import Content from './Content'

interface RightProps {
  match: any
}

class Right extends React.Component<RightProps> {
  render() {
    return (
      <div className="app-right">
        <div className="app-right-content"></div>
        <Content match={this.props.match}></Content>
      </div>
    )
  }
}

export default Right
