/**
 * Created by jiangyukun on 2017/11/9.
 */
import React from 'react'

interface OrderCategoryTitleProps {
  src: string
  title: string
}

class OrderCategoryTitle extends React.Component<OrderCategoryTitleProps> {
  render() {
    return (
      <div className="detail-title">
        <div className="title-icon-container">
          <img src={this.props.src}/>
        </div>
        {this.props.title}：
      </div>
    )
  }
}

export default OrderCategoryTitle
