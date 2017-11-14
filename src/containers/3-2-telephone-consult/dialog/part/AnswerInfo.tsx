/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'
import {getDateTimeStr} from '../../../../core/utils/dateUtils'

interface AnswerInfoProps {
  answerStatus: boolean
  answer: any
}

class AnswerInfo extends React.Component<AnswerInfoProps> {
  render() {
    let answer = this.props.answer
    return (
      <section className="qa-big-category answer-info">
        <OrderCategoryTitle src={require('../icon/qa.svg')} title="回答信息"/>
        <PartContent status={this.props.answerStatus} noDataTxt="暂无回答">
          <div className="category-item">
            <Label size="small">回答者</Label>
            <div>
              {answer['answer_title_name']}

            </div>
          </div>
          <div className="category-item">
            <Label size="small">回答内容</Label>
            <div>
              {answer['answer_content']}
            </div>
          </div>
          <div className="category-item">
            <Label size="small">回答时间</Label>
            <div>
              {getDateTimeStr(answer['answer_time'])}
            </div>
          </div>
        </PartContent>
      </section>
    )
  }
}

export default AnswerInfo
