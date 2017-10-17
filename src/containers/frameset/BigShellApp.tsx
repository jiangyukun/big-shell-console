/**
 * Created by jiangyukun on 2017/4/11.
 */
import React from 'react'
import {connect} from 'react-redux'
import MessageManage from 'wj-appcore/message/'
import {changeMessageStatus} from 'wj-appcore/message/message.action'

import style from '../../css/app.scss'
import Header from './Header'
import Aside from './Aside'

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
      <div className={style['big-shell-app']}>
        <MessageManage
          messageList={this.props.message.msgQueue}
          changeMessageStatus={this.props.changeMessageStatus}
        />
        <Header></Header>
        <Aside></Aside>
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
