/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import Label from '../../../../components/element/Label'

interface UserAppealProps {

}

class UserAppeal extends React.Component<UserAppealProps> {
  render() {
    return (
      <section className="appeal-info">
        <div className="detail-title">
          <img src={require('../icon/qa.svg')}/>用户申诉：
        </div>
        <div className="appeal-info-item">
          <Label size="small">申诉类别</Label>
          <div>
            刘志华
          </div>
        </div>
        <div className="appeal-info-item">
          <Label size="small">申诉内容</Label>
          <div>
            抗病毒期间，感冒了还能吃药吗？哪些要可以吃啊？着急，在线等~回答的不太好，感觉不舒服
          </div>
        </div>
        <div className="appeal-info-item">
          <Label size="small">申诉时间</Label>
          <div>2017-07-09 17:30:29</div>
        </div>
        <div className="appeal-info-item">
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
          <div className="modify-appeal-container">
            <button>修改处理结果</button>
          </div>
        </div>
      </section>
    )
  }
}

export default UserAppeal
