/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import PropTypes from 'prop-types'

interface FixHeadListProps {
  total?: number
  weights?: (number | string)[]
  minWidth?: string
}

class FixHeadList extends React.Component<FixHeadListProps> {
  static defaultProps = {
    weights: []
  }
  static childContextTypes = {
    weights: PropTypes.array,
    total: PropTypes.number,
    onLayoutUpdate: PropTypes.func,
    bodyWidth: PropTypes.number,
    scrollLeft: PropTypes.number,
    minWidth: PropTypes.string
  }

  state = {
    bodyWidth: 0,
    scrollLeft: 0
  }

  onLayoutUpdate = (name, value) => {
    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="fix-head-list">
        {this.props.children}
      </div>
    )
  }

  getChildContext() {
    return {
      weights: this.props.weights,
      total: this.props.total,
      minWidth: this.props.minWidth,
      onLayoutUpdate: this.onLayoutUpdate,
      bodyWidth: this.state.bodyWidth,
      scrollLeft: this.state.scrollLeft
    }
  }
}

export default FixHeadList
