/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {browserParams} from '../../core/env'

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

class FixHead extends React.Component<any> {
  static Item = Item
  static contextTypes = {
    weights: PropTypes.array,
    bodyWidth: PropTypes.number,
    scrollLeft: PropTypes.number
  }
  wrap: HTMLDivElement

  componentDidUpdate() {
    this.wrap.scrollLeft = this.context.scrollLeft
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

    return (
      <div ref={c => this.wrap = c} className="head-wrap" style={{marginRight: browserParams.scrollWidth}}>
        <ul className="head-container" style={{width: this.context.bodyWidth || 'auto'}}>
          {childrenWithWidth}
        </ul>
      </div>
    )
  }
}

export default FixHead
