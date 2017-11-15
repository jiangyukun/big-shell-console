/**
 * Created by jiangyukun on 2017/11/15.
 */
import React from 'react'

interface AvailableConsultDayProps {

}

const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

class AvailableConsultDay extends React.Component<AvailableConsultDayProps> {
  render() {
    let morningItem = [0, 0, 0, 1, 1, 1, 0]
    return (
      <div>
        <header className="weeks">
          <div className="item week-item"></div>
          {
            weeks.map((item, index) => {
              return (
                <div key={index} className="item week-item">{item}</div>
              )
            })
          }
        </header>
        <div className="morning">
          <div className="item morning-item">上午</div>
          {
            morningItem.map((item, index) => {
              return (
                <div key={index} className="item morning-item"></div>
              )
            })
          }
        </div>
        <div className="afternoon">
          <div className="item afternoon-item">下午</div>
          {
            morningItem.map((item, index) => {
              return (
                <div key={index} className="item afternoon-item"></div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default AvailableConsultDay
