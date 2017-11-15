/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'
import {getDateTimeStr} from '../../../../core/utils/dateUtils'
import Button from '../../../../components/button/Button'

interface ServiceInfoProps {

}

class ServiceInfo extends React.Component<ServiceInfoProps> {
  render() {
    let answer = {}
    return (
      <section className="big-category service-info">
        <OrderCategoryTitle src={require('../icon/telephone.svg')} title="服务信息"/>
        <PartContent status={true} noDataTxt="暂无服务">
          <div className="service-info-main">
            <div className="flex1">
              <div className="service-info-item">
                <div className="content">
                  等待确认服务时间
                </div>
              </div>
              <div className="service-info-item">
                <div className="content">
                  计划服务时间：2017-07-09 17:30
                </div>
              </div>
              <div className="service-info-item">
                <div className="content">
                  服务已结束：2017-07-09 17:30
                </div>
              </div>
            </div>
            <div className="add-service-info">
              <button>添加服务信息</button>
            </div>
          </div>
        </PartContent>
      </section>
    )
  }
}

export default ServiceInfo
