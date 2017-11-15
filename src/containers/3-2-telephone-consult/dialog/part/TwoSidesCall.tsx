/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'
import {getDateTimeStr} from '../../../../core/utils/dateUtils'
import Button from '../../../../components/button/Button'

interface TwoSidesCallProps {

}

class TwoSidesCall extends React.Component<TwoSidesCallProps> {
  render() {
    let answer = {}
    return (
      <section className="big-category two-sides-call">
        <OrderCategoryTitle src={require('../icon/two-sides-call.svg')} title="双方语音通话记录"/>
        <PartContent status={true} noDataTxt="暂无">
          <div className="mt7">
            <div className="call-item">
              <div className="content">
                医生呼叫，未接通
              </div>
            </div>
            <div className="call-item">
              <div className="content">
                患者呼叫，未接通
              </div>
            </div>
            <div className="call-item">
              <div className="content">
                医生呼叫，通话时长：16分20秒
              </div>
            </div>
          </div>
        </PartContent>
      </section>
    )
  }
}

export default TwoSidesCall
