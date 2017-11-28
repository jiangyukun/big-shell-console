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
  body: HTMLDivElement

  handleScroll = (e) => {
    const {scrollLeft, clientHeight, scrollHeight} = e.target
    this.context.onLayoutUpdate('scrollLeft', scrollLeft)
    this.context.onLayoutUpdate('verticalScroll', scrollHeight > clientHeight)
  }

  refreshScrollState = () => {
    setTimeout(() => {
      if (this.body) {
        const {clientHeight, scrollHeight} = this.body
        this.context.onLayoutUpdate('verticalScroll', scrollHeight > clientHeight)
      }
    }, 0)
  }

  componentDidMount() {
    this.refreshScrollState()
  }

  componentDidUpdate() {
    this.refreshScrollState()
  }

  render() {
    return (
      <div ref={c => this.body = c} className="fix-body-wrap" onScroll={this.handleScroll}>
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
