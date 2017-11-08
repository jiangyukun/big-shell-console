/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import Label from '../../../../components/element/Label'

interface AnswerInfoProps {

}

class AnswerInfo extends React.Component<AnswerInfoProps> {
  render() {
    return (
      <section className="answer-info">
        <div className="detail-title">
          <img src={require('../icon/qa.svg')}/>回答信息：
        </div>
        <div className="answer-info-item">
          <Label size="small">回答者</Label>
          <div>
            刘志华
          </div>
        </div>
        <div className="answer-info-item">
          <Label size="small">回答内容</Label>
          <div>
            刘志华
          </div>
        </div>
        <div className="answer-info-item">
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
