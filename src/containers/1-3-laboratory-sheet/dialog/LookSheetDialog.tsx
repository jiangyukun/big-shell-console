/**
 * Created by jiangyukun on 2017/11/22.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal/Modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import Data from '../../../core/interface/Data'
import {SheetItem, PatientSheet} from '../interface/Sheet'
import {fetchSheetCategoryList} from '../laboratory-sheet.action'
import {SHEET_TYPE_TEXT_MAPPER} from '../laboratory-sheet.constant'

interface LookSheetDialogProps {
  mobile: string
  type: string
  patient: PatientSheet
  fetchSheetCategoryList: (mobile, type) => void
  sheetCategoryList: Data<SheetItem[]>
  onExited: () => void
}

class LookSheetDialog extends React.Component<LookSheetDialogProps> {
  state = {
    show: true,
    currentIndex: -1,
    lastIndex: null
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchSheetCategoryList(this.props.mobile, this.props.type)
  }

  componentDidUpdate() {
    if (this.state.currentIndex != -1 && this.state.lastIndex != this.state.currentIndex) {
      this.setState({lastIndex: this.state.currentIndex})
    }
  }

  componentWillReceiveProps(nextProps: LookSheetDialogProps) {
    if (!this.props.sheetCategoryList.loaded && nextProps.sheetCategoryList.loaded) {
      if (nextProps.sheetCategoryList.data.length > 0) {
        this.setState({currentIndex: 0, lastIndex: 0})
      }
    }
  }

  render() {
    const sheetList = this.props.sheetCategoryList.data || []
    const patient = this.props.patient
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}
             contentComponent={FullDialogContent}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>{patient.username} - {this.props.mobile} - {SHEET_TYPE_TEXT_MAPPER[this.props.type]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            (this.state.currentIndex == this.state.lastIndex) && (
              <img src={sheetList[this.state.currentIndex].sheetUrl}/>
            )
          }
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    sheetCategoryList: state.sheetCategoryList
  }
}

export default connect(mapStateToProps, {fetchSheetCategoryList})(LookSheetDialog)
