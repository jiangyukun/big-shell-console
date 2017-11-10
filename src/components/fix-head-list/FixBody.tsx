/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import PropTypes from 'prop-types'

class FixBody extends React.Component {
  static contextTypes = {
    total: PropTypes.number,
    onLayoutUpdate: PropTypes.func
  }

  handleScroll = (e) => {
    const {offsetWidth, clientWidth, scrollLeft} = e.target
    this.context.onLayoutUpdate('scrollLeft', scrollLeft)
    this.context.onLayoutUpdate('scrollWidth', offsetWidth - clientWidth)
  }

  render() {
    return (
      <div className="fix-body-wrap" onScroll={this.handleScroll}>
        {
          this.context.total == 0 && (
            <div className="no-list-data">
              暂无数据
            </div>
          )
        }
        {this.props.children}
      </div>
    )
  }
}

export default FixBody
