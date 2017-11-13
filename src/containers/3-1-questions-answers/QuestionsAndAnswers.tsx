/**
 * Created by jiangyukun on 2017/11/6.
 */
import React from 'react'
import {connect} from 'react-redux'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import Button from '../../components/button/Button'
import OrderDetailDialog from './dialog/OrderDetailDialog'
import OrderOperationRecordDialog from './dialog/OrderOperationRecordDialog'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import DateInterval from '../../components/query-filter/extends/DateInterval'
import FilterOptions from '../../components/query-filter/FilterOptions'
import SelectedFilter from '../../components/query-filter/SelectedFilter'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {filters} from './qa-order.constant'
import {handleListData, getStartEndDateStr, haveNotEmptyValue} from '../common/common-helper'
import {fetchList} from './questions-answers.action'
import {getDateStr} from '../../core/utils/dateUtils'
import Icon from '../../components/Icon'
import EditRemark from '../../components/EditRemark'
import EditAppealResultDialog from './dialog/EditAppealResultDialog'
import SelectedItem from '../../components/query-filter/SelectedItem'

interface QuestionsAndAnswersProps extends AppFunctionPage {
  questionAnswerList: Data<any>
  updateRemark: () => void
}

class QuestionsAndAnswers extends React.Component<QuestionsAndAnswersProps> {
  state = {
    searchKey: '',
    index: -1,
    currentPage: 0,
    showOrderRecord: false,
    showOrderDetail: false,
    showEditRemark: false,

    startDate1: null,
    endDate1: null,

    answerStatus: '',

    startDate2: null,
    endDate2: null,

    paymentStatus: '',
    paymentType: '',

    startDate3: null,
    endDate3: null,

    isHide: ''
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "limit": 10,
      "key_words": this.state.searchKey,
      "question_begin_time": getDateStr(this.state.startDate1),
      "question_end_time": getDateStr(this.state.endDate1),
      "answer_status": this.state.answerStatus,
      "answer_begin_time": getDateStr(this.state.startDate2),
      "answer_end_time": getDateStr(this.state.endDate2),
      "pay_status": this.state.paymentStatus,
      "pay_way": this.state.paymentType,
      "pay_begin_time": getDateStr(this.state.startDate3),
      "pay_end_time": getDateStr(this.state.endDate3),
      "is_hide": this.state.isHide
    })
  }

  clearAllFilter = () => {
    this.setState({
      startDate1: null,
      endDate1: null,
      answerStatus: '',
      startDate2: null,
      endDate2: null,
      paymentStatus: '',
      paymentType: '',
      startDate3: null,
      endDate3: null,
      isHide: ''
    })
  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.questionAnswerList)
    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page">
        {
          this.state.showOrderRecord && (
            <OrderOperationRecordDialog
              onExited={() => this.setState({showOrderRecord: false})}
            />
          )
        }
        {
          this.state.showOrderDetail && (
            <OrderDetailDialog
              orderCode={item['question_order_code'] || '0117110002401'}
              onExited={() => this.setState({showOrderDetail: false})}
            />
          )
        }
        {
          this.state.showEditRemark && (
            <EditRemark
              updateRemark={this.props.updateRemark}
              updateRemarkSuccess={false}
              onExited={() => this.setState({showEditRemark: false})}
            />
          )
        }

        <div className="toolbar">
          <div>
            <Button disabled={this.state.index == -1} onClick={() => this.setState({showOrderDetail: true})}>查看</Button>
            <Button onClick={() => this.setState({showOrderRecord: true})}>操作记录</Button>
          </div>
          <div>
            <SearchBox label="患者" placeholder="输入手机号码、编号查询"
                       searchKey={this.state.searchKey} onChange={v => this.setState({searchKey: v})}
                       onSearch={() => this.toPage(0)}
            />
            <Button>导出到Excel</Button>
          </div>
        </div>
        <div className="query-filter">
          <FilterItem size="big" label="提问时间">
            <DateInterval
              startDate={this.state.startDate1} endDate={this.state.endDate1}
              onStartDateChange={v => this.setState({startDate1: v})} onEndDateChange={v => this.setState({endDate1: v})}
            />
          </FilterItem>
          <FilterItem size="big" label="回答时间">
            <DateInterval
              startDate={this.state.startDate2} endDate={this.state.endDate2}
              onStartDateChange={v => this.setState({startDate2: v})} onEndDateChange={v => this.setState({endDate2: v})}
            />
          </FilterItem>
          <FilterItem size="big" label="付款时间">
            <DateInterval
              startDate={this.state.startDate3} endDate={this.state.endDate3}
              onStartDateChange={v => this.setState({startDate3: v})} onEndDateChange={v => this.setState({endDate3: v})}
            />
          </FilterItem>
          <FilterItem label="回答状态">
            <FilterOptions options={filters.answerStatus} value={this.state.answerStatus} onChange={v => this.setState({answerStatus: v})}/>
          </FilterItem>
          <FilterItem label="付款状态">
            <FilterOptions options={filters.paymentStatus} value={this.state.paymentStatus} onChange={v => this.setState({paymentStatus: v})}/>
          </FilterItem>
          <FilterItem label="支付方式">
            <FilterOptions options={filters.paymentType} value={this.state.paymentType} onChange={v => this.setState({paymentType: v})}/>
          </FilterItem>
          <FilterItem label="是否隐藏">
            <FilterOptions options={filters.isHide} value={this.state.isHide} onChange={v => this.setState({isHide: v})}/>
          </FilterItem>
          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, ['startDate1', 'endDate1', 'startDate2', 'endDate2', 'startDate3', 'endDate3', 'answerStatus', 'paymentStatus', 'paymentType', 'isHide'])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            <SelectedItem
              label="提问时间" text={getStartEndDateStr(this.state.startDate1, this.state.endDate1)}
              onReset={() => this.setState({startDate1: null, endDate1: null})}
            />
            <SelectedItem
              label="回答时间" text={getStartEndDateStr(this.state.startDate2, this.state.endDate2)}
              onReset={() => this.setState({startDate2: null, endDate2: null})}
            />
            <SelectedItem
              label="付款时间" text={getStartEndDateStr(this.state.startDate3, this.state.endDate3)}
              onReset={() => this.setState({startDate3: null, endDate3: null})}
            />
            <SelectedItem
              label="回答状态" value={this.state.answerStatus} options={filters.answerStatus}
              onReset={() => this.setState({answerStatus: ''})}
            />
            <SelectedItem
              label="付款状态" value={this.state.paymentStatus} options={filters.paymentStatus}
              onReset={() => this.setState({paymentStatus: ''})}
            />
            <SelectedItem
              label="支付方式" value={this.state.paymentType} options={filters.paymentType}
              onReset={() => this.setState({paymentType: ''})}
            />
            <SelectedItem
              label="是否隐藏" value={this.state.isHide} options={filters.isHide}
              onReset={() => this.setState({isHide: ''})}
            />
          </SelectedFilter>
        </div>
        <FixHeadList total={total} minWidth="2000px">
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
                    <FixRow.Item>{item['']}</FixRow.Item>
                    <FixRow.Item>{item['question_time']}</FixRow.Item>
                    <FixRow.Item>{item['']}</FixRow.Item>
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
                    <FixRow.Item>
                      {item['order_remark']}
                      <Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                    </FixRow.Item>
                    <FixRow.Item>{item['is_hide']}</FixRow.Item>
                  </FixRow>
                )
              })
            }
          </FixBody>
        </FixHeadList>
        <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
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
