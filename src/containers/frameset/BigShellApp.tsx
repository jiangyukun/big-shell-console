/**
 * Created by jiangyukun on 2017/4/11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MessageManage from 'app-core/message/'
import {changeMessageStatus} from 'app-core/message/message.action'

import Left from './Left'
import Right from './Right'

import {getPath} from '../../core/env'
import {PAGES} from '../../core/constants/pages'

interface BigShellAppProps {
  message: any
  changeMessageStatus: any
  match: any
  currentPath: string
  router: any
}

class BigShellApp extends React.Component<BigShellAppProps> {
  static contextTypes = {
    router: PropTypes.any
  }

  componentWillMount() {
    if (this.props.currentPath == getPath('index')) {
      this.context.router.history.replace(getPath(PAGES.TELEPHONE_CONSULT))
    }
  }

  render() {
    return (
      <div className="big-shell-app">
        <MessageManage
          messageList={this.props.message.msgQueue}
          changeMessageStatus={this.props.changeMessageStatus}
        />

        <Left currentPath={this.props.currentPath}></Left>
        <Right match={this.props.match}></Right>
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
