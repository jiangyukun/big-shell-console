/**
 * Created by jiangyukun on 2017/7/5.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {showMessage, showSuccess, showWarning} from 'app-core/message/message.action'

export default function addCommonFunction(Component) {

  class CommonFunctionWrap extends React.Component<any> {
    static contextTypes = {
      store: PropTypes.any
    }

    render() {
      return (
        <Component
          {...this.props}
          showMessage={bindActionCreators(showMessage, this.context.store.dispatch)}
          showSuccess={bindActionCreators(showSuccess, this.context.store.dispatch)}
          showWarning={bindActionCreators(showWarning, this.context.store.dispatch)}
        />
      )
    }
  }

  return CommonFunctionWrap
}
