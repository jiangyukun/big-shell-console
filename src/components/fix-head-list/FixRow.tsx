/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Item extends React.Component<any> {
  render() {
    const style: any = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    if (this.props.flex) {
      style.flex = this.props.flex
    }

    return (
      <li style={style} className="item">
        {this.props.children}
      </li>
    )
  }
}

interface FixRowProps extends React.HTMLProps<HTMLUListElement> {
  selected?: boolean
}

class FixRow extends React.Component<FixRowProps> {
  static Item = Item
  static contextTypes = {
    weights: PropTypes.array,
    onLayoutUpdate: PropTypes.func,
    minWidth: PropTypes.string
  }

  row: HTMLUListElement

  componentDidMount() {
    setTimeout(() => {
      this.context.onLayoutUpdate('bodyWidth', this.row.clientWidth)
    }, 0)
  }

  render() {
    const weights = this.context.weights
    const childrenWithWidth = []
    let current = 0
    React.Children.forEach(this.props.children, (child: any) => {
      if (child.type == Item) {
        if (typeof weights[current] == 'string') {
          childrenWithWidth.push(React.cloneElement(child, {key: current, width: weights[current]}))
        } else {
          childrenWithWidth.push(React.cloneElement(child, {key: current, flex: weights[current] || 1}))
        }
        current++
      }
    })

    let {selected, ...otherProps} = this.props
    return (
      <ul style={{minWidth: this.context.minWidth}}
          className={classnames('row-container', {'selected': selected})} {...otherProps}
          ref={c => this.row = c}
      >
        {childrenWithWidth}
      </ul>
    )
  }
}

export default FixRow
