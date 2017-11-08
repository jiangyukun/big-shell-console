/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {getTxt} from '../../../common/common-helper'

interface OrderBasicInfoProps {
  detail: any
}

class OrderBasicInfo extends React.Component<OrderBasicInfoProps> {
  render() {
    const detail = this.props.detail

    const basicInfo = detail['base_info'] || {}
    const photoUrl = basicInfo['photo_url'] || require('../icon/1.png')
    const username = detail['real_name']
    const mobile = '18625743829'
    const nickname = basicInfo['nick_name']
    const content = basicInfo['question_content']
    const questionOwner = getTxt(basicInfo['question_target_name'])
    const questionTime = getTxt(basicInfo['question_time'])

    return (
      <section className="qa-basic-info">
        <div className="user-basic-info">
          <img src={photoUrl}/>
          <span className="username">{username}</span>
          <span className="nickname">{nickname}</span>
          <span className="mobile">{mobile}</span>
        </div>
        <div className="qa-content">
          <div className="qa-content-text">{content}</div>
        </div>
        <div className="question-owner">
          <label>提问对象：</label>{questionOwner}
        </div>
        <div className="question-date-time">
          <label>提问时间：</label>{questionTime}
        </div>
      </section>
    )
  }
}

export default OrderBasicInfo
