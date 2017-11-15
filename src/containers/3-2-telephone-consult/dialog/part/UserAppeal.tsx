/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'

interface UserAppealProps {
}

class UserAppeal extends React.Component<UserAppealProps> {
  state = {
    showModify: false
  }

  render() {
    return (
      <section className="big-category appeal-info">
        <OrderCategoryTitle src={require('../icon/appeal.svg')} title="用户申诉"/>
        <PartContent status={true} noDataTxt="未申诉">
          <div className="category-item appeal-info-item">
            <Label size="small">申诉类别</Label>
            <div>
              我要退款（服务48小时后不可退款）
            </div>
          </div>
          <div className="category-item appeal-info-item">
            <Label size="small">申诉内容</Label>
            <div>
              抗病毒期间，感冒了还能吃药吗？哪些要可以吃啊？着急，在线等~回答的不太好，感觉不舒服
            </div>
          </div>
          <div className="category-item appeal-info-item">
            <Label size="small">申诉时间</Label>
            <div>2017-07-09 17:30:29</div>
          </div>
          <div className="category-item appeal-info-item">
            <div className="flex1">
              <div className="flex">
                <Label size="small">处理结果</Label>
                <div>2017-07-09 17:30:29 申诉失败</div>
              </div>
              <div className="flex mt7">
                <Label size="small">处理备注</Label>
                <div>20170913为用户重新解答</div>
              </div>
            </div>
            <div className="button-area">
              <button onClick={() => this.setState({showModify: true})}>修改处理结果</button>
            </div>
          </div>
        </PartContent>
      </section>
    )
  }
}

export default UserAppeal
