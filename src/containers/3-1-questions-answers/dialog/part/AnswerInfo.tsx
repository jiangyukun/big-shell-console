/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../common/OrderCategoryTitle'

interface AnswerInfoProps {

}

class AnswerInfo extends React.Component<AnswerInfoProps> {
  render() {
    return (
      <section className="qa-big-category answer-info">
        <OrderCategoryTitle src={require('../icon/qa.svg')} title="回答信息"/>
        <div className="category-item">
          <Label size="small">回答者</Label>
          <div>
            刘志华
          </div>
        </div>
        <div className="category-item">
          <Label size="small">回答内容</Label>
          <div>
            刘志华
          </div>
        </div>
        <div className="category-item">
          <Label size="small">回答时间</Label>
          <div>
            2017-07-09 17:30:29
          </div>
        </div>
      </section>
    )
  }
}

export default AnswerInfo
