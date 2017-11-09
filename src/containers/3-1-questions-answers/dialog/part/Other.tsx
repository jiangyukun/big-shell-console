/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../common/OrderCategoryTitle'
import EditRemark from '../../../../components/EditRemark'

interface OtherProps {
  other: any
}

class Other extends React.Component<OtherProps> {
  state = {
    editRemark: true
  }

  render() {
    const other = this.props.other
    let remark = ''
    if (other['order_remark']) remark = other['order_remark']

    return (
      <section className="qa-big-category other">
        {
          this.state.editRemark && (
            <EditRemark updateRemark={() => null} updateRemarkSuccess={false} onExited={() => this.setState({editRemark: false})}/>
          )
        }
        <OrderCategoryTitle src={require('../icon/other.svg')} title="其它"/>
        <div className="category-item">
          <div className="item-main-content">
            <Label size="small">备注</Label>
            {
              remark && (
                <div>{remark}</div>
              )
            }
            {
              !remark && (
                <span style={{color: 'gray'}}>未填写</span>
              )
            }
          </div>
          <div className="button-area">
            <button onClick={() => this.setState({editRemark: true})}>编辑</button>
          </div>
        </div>
        <div className="category-item">
          <div className="item-main-content">
            <Label size="small">是否隐藏</Label>
            <div>{this.props.other['is_hide_desc']}</div>
          </div>
          <div className="button-area">
            <button>恢复</button>
          </div>
        </div>
      </section>
    )
  }
}

export default Other
