/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'

interface RateInfoProps {

}

class RateInfo extends React.Component<RateInfoProps> {
  render() {
    return (
      <section className="big-category rate-info">
        <OrderCategoryTitle src={require('../icon/rate.svg')} title="评分信息"/>
        <PartContent status={true} noDataTxt="暂无评分">
          <div className="rate-info-item category-item">
            <Label size="small">用户评分</Label>
            <div>
              <img src={require('../icon/rate-full.svg')}/>
              <img src={require('../icon/rate-full.svg')}/>
              <img src={require('../icon/rate-full.svg')}/>
              <img src={require('../icon/rate-full.svg')}/>
              <img src={require('../icon/rate-empty.svg')}/>
              4.0分
            </div>
          </div>
          <div className="rate-info-item category-item">
            <Label size="small">评价内容</Label>
            <div>
              抗病毒期间，感冒了还能吃药吗？哪些要可以吃啊？着急，在线等~回答的不太好，感觉不舒服
            </div>
          </div>
          <div className="rate-info-item category-item">
            <Label size="small">评价时间</Label>
            <div>2017-07-09 17:30:29</div>
          </div>
        </PartContent>
      </section>
    )
  }
}

export default RateInfo
