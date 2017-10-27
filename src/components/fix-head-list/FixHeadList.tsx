/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import PropTypes from 'prop-types'

interface FixHeadListProps {
  total?: number
  weights?: (number | string)[]
}

class FixHeadList extends React.Component<FixHeadListProps> {
  static defaultProps = {
    weights: []
  }
  static childContextTypes = {
    weights: PropTypes.array,
    total: PropTypes.number,
    onLayoutUpdate: PropTypes.func,
    bodyWidth: PropTypes.number
  }
  state = {
    bodyWidth: 0
  }

  onLayoutUpdate = (width) => {
    this.setState({bodyWidth: width})
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
      onLayoutUpdate: this.onLayoutUpdate,
      bodyWidth: this.state.bodyWidth
    }
  }
}

export default FixHeadList
