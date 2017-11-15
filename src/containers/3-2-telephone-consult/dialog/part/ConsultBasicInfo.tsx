/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import {getTxt} from '../../../common/common-helper'
import Label from '../../../../components/element/Label'
import AvailableConsultDay from '../base/AvailableConsultDay'

interface ConsultBasicInfoProps {
}

class ConsultBasicInfo extends React.Component<ConsultBasicInfoProps> {
  state = {}

  render() {
    const detail = {}

    const basicInfo = detail['base_info'] || {}
    const photoUrl = basicInfo['photo_url'] || require('../icon/1.png')
    const username = detail['real_name']
    const mobile = '18625743829'
    const nickname = basicInfo['nick_name']
    const content = basicInfo['question_content']
    const questionOwner = getTxt(basicInfo['question_target_name'])
    const questionTime = getTxt(basicInfo['question_time'])

    return (
      <section className="big-category user-basic-info">
        <div className="category-item">
          <img src={photoUrl}/>
          <div>
            <div className="username">{username} ( {nickname} )</div>
            <div className="mobile">{mobile}</div>
          </div>
        </div>
        <div className="category-item">
          <div className="qa-content-text">抗病毒期间，感冒了还能吃药吗？哪些要可以吃啊？着急，在线等~</div>
        </div>
        <div className="category-item">
          <Label size="small">期望时间</Label>2017-09-10 周三下午
        </div>
        <div className="category-item">
          <Label size="small">咨询对象</Label>刘志华
        </div>
        <div className="category-item">
          <Label size="small">可咨询时间</Label>
          <AvailableConsultDay/>
        </div>
        <div className="category-item">
          <Label size="small">订单时间</Label>2017-07-09 17:30:29
        </div>
      </section>
    )
  }
}

export default ConsultBasicInfo
