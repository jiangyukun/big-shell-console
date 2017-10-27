/**
 * Created by jiangyukun on 2017/4/11.
 */
import React from 'react'
import {connect} from 'react-redux'
import MessageManage from 'wj-appcore/message/'
import {changeMessageStatus} from 'wj-appcore/message/message.action'

import Left from './Left'
import Aside from './Aside'
import Content from './Content'
import Right from './Right'

interface BigShellAppProps {
  message: any
  changeMessageStatus: any
  match: any
  currentPath: string
  router: any
}

class BigShellApp extends React.Component<BigShellAppProps> {
  render() {
    return (
      <div className="big-shell-app">
        <MessageManage
          messageList={this.props.message.msgQueue}
          changeMessageStatus={this.props.changeMessageStatus}
        />

        <Left></Left>
        <Right match={this.props.match}></Right>
        {/*<Aside></Aside>*/}
        {/**/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  let currentPath = state.router.location.pathname
  return {
    ...state['app'],
    currentPath,
    message: state.message
  }
}

export default connect(mapStateToProps, {
  changeMessageStatus
})(BigShellApp)
