/**
 * Created by jiangyukun on 2017/11/6.
 */
import React from 'react'
import {connect} from 'react-redux'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {handleListData} from '../common/common-helper'
import {fetchList} from './questions-answers.action'
import Button from '../../components/button/Button'

interface QuestionsAndAnswersProps extends AppFunctionPage {
  questionAnswerList: Data<any>
}

class QuestionsAndAnswers extends React.Component<QuestionsAndAnswersProps> {
  state = {
    searchKey: '',
    index: -1,
    currentPage: 0
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      start: 0,
      limit: 10,
    })
  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.questionAnswerList)

    return (
      <div className="app-function-page">
        <div className="toolbar">
          <Button>查看</Button>
          <Button>操作记录</Button>
        </div>
        <div className="list-wrap">
          <FixHeadList total={total}>
            <FixHead>
              <FixHead.Item>订单编号</FixHead.Item>
              <FixHead.Item>患者编号</FixHead.Item>
              <FixHead.Item>手机号码</FixHead.Item>
              <FixHead.Item>真实姓名</FixHead.Item>
              <FixHead.Item>提问内容</FixHead.Item>
              <FixHead.Item>提问时间</FixHead.Item>
              <FixHead.Item>提问对象</FixHead.Item>
              <FixHead.Item>回答者</FixHead.Item>
              <FixHead.Item>回答内容</FixHead.Item>
              <FixHead.Item>回答时间</FixHead.Item>
              <FixHead.Item>付款状态</FixHead.Item>
              <FixHead.Item>支付方式</FixHead.Item>
              <FixHead.Item>付款金额</FixHead.Item>
              <FixHead.Item>付款时间</FixHead.Item>
              <FixHead.Item>用户评分</FixHead.Item>
              <FixHead.Item>评价内容</FixHead.Item>
              <FixHead.Item>评价时间</FixHead.Item>
              <FixHead.Item>备注</FixHead.Item>
              <FixHead.Item>是否隐藏</FixHead.Item>
            </FixHead>
            <FixBody>
              {
                list.map((item, index) => {
                  return (
                    <FixRow key={item['question_order_code']}
                            onClick={() => this.setState({index})}
                            selected={this.state.index == index}
                    >
                      <FixRow.Item>{item['question_order_code']}</FixRow.Item>
                      <FixRow.Item>{item['patient_code']}</FixRow.Item>
                      <FixRow.Item>{item['user_account']}</FixRow.Item>
                      <FixRow.Item>{item['real_name']}</FixRow.Item>
                      <FixRow.Item>{item['question_time']}</FixRow.Item>
                      <FixRow.Item>{item['question_type']}</FixRow.Item>
                      <FixRow.Item>{item['doctor_info_id']}</FixRow.Item>
                      <FixRow.Item>{item['answer_person']}</FixRow.Item>
                      <FixRow.Item>{item['answer_content']}</FixRow.Item>
                      <FixRow.Item>{item['answer_time']}</FixRow.Item>
                      <FixRow.Item>{item['pay_status']}</FixRow.Item>
                      <FixRow.Item>{item['pay_way']}</FixRow.Item>
                      <FixRow.Item>{item['pay_money']}</FixRow.Item>
                      <FixRow.Item>{item['pay_time']}</FixRow.Item>
                      <FixRow.Item>{item['evaluate_store']}</FixRow.Item>
                      <FixRow.Item>{item['evaluate_content']}</FixRow.Item>
                      <FixRow.Item>{item['evaluate_time']}</FixRow.Item>
                      <FixRow.Item>{item['order_remark']}</FixRow.Item>
                      <FixRow.Item>{item['is_hide']}</FixRow.Item>
                    </FixRow>
                  )
                })
              }
            </FixBody>
          </FixHeadList>
          <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    questionAnswerList: state.questionAnswerList
  }
}

export default connect(mapStateToProps, {fetchList})(QuestionsAndAnswers)
