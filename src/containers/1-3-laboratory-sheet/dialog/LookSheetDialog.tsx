/**
 * Created by jiangyukun on 2017/11/22.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal/Modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Confirm from 'app-core/common/Confirm'

import Image from '../../../components/element/Image'
import Button from '../../../components/button/Button'

import Data from '../../../core/interface/Data'
import {SheetItem, PatientSheet} from '../interface/Sheet'
import {SHEET_TYPE_TEXT_MAPPER, SHEET_STATUS, SHEET_STATUS_TEXT} from '../laboratory-sheet.constant'
import {fetchSheetCategoryList, updateSheetStatus} from '../laboratory-sheet.action'

interface LookSheetDialogProps {
  mobile: string
  type: string
  patient: PatientSheet
  fetchSheetCategoryList: (mobile, type) => void
  sheetCategoryList: Data<SheetItem[]>
  updateSheetStatus: (sheetId, sheetStatus) => void
  updateSheetStatusSuccess: boolean
  onExited: () => void
}

class LookSheetDialog extends React.Component<LookSheetDialogProps> {
  sheetStatus: number

  state = {
    show: true,
    showUpdateSheetStatusConfirm: false,
    currentIndex: -1,
    lastIndex: null,
    scale: 1,
    angle: 0
  }

  close = () => {
    this.setState({show: false})
  }

  previousPicture = () => {
    if (this.state.currentIndex > 0) {
      this.setState({scale: 1, angle: 0})
      this.setState({currentIndex: this.state.currentIndex - 1})
    }
  }

  nextPicture = () => {
    if (this.state.currentIndex < this.props.sheetCategoryList.data.length - 1) {
      this.setState({scale: 1, angle: 0})
      this.setState({currentIndex: this.state.currentIndex + 1})
    }
  }

  markSheet = (sheetStatus) => {
    this.sheetStatus = sheetStatus
    this.setState({showUpdateSheetStatusConfirm: true})
  }

  updateSheetStatus = () => {
    let sheetId = this.props.sheetCategoryList.data[this.state.currentIndex].sheetId
    this.props.updateSheetStatus(sheetId, this.sheetStatus)
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
    if (!this.props.updateSheetStatusSuccess && nextProps.updateSheetStatusSuccess) {
      this.close()
    }
  }

  render() {
    const sheetList = this.props.sheetCategoryList.data || []
    const sheetItem = sheetList[this.state.currentIndex]
    const patient = this.props.patient

    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}
             contentComponent={FullDialogContent} className="look-sheet-dialog"
      >
        {
          this.state.showUpdateSheetStatusConfirm && (
            <Confirm
              message={`确定标为${SHEET_STATUS_TEXT[this.sheetStatus]}吗？`}
              onExited={() => this.setState({showUpdateSheetStatusConfirm: false})}
              onConfirm={this.updateSheetStatus}
            />
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>
            {patient.username} - {this.props.mobile} - {SHEET_TYPE_TEXT_MAPPER[this.props.type]}
            ({this.state.currentIndex + 1}/{sheetList.length})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="picture-panel">
            <div className="mr5">
              <Button theme="to-sheet-item" onClick={this.previousPicture} disabled={this.state.currentIndex == 0}>
                <i className="fa fa-arrow-left"></i>
              </Button>
            </div>
            <div className="picture-container">
              <div>
                {
                  (this.state.currentIndex == this.state.lastIndex) && (
                    <Image src={sheetList[this.state.currentIndex].sheetUrl}
                           scale={this.state.scale} angle={this.state.angle}
                    />
                  )
                }
              </div>
            </div>
            <div className="ml5">
              <Button theme="to-sheet-item" onClick={this.nextPicture} disabled={this.state.currentIndex == sheetList.length - 1}>
                <i className="fa fa-arrow-right"></i>
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {
            (this.state.currentIndex == this.state.lastIndex) && (
              <div className="flex between">
                <div>
                  <Button onClick={() => this.setState({scale: this.state.scale * 1.1})}>放大</Button>
                  <Button onClick={() => this.setState({scale: this.state.scale * 0.9})}>缩小</Button>
                  <Button onClick={() => this.setState({angle: this.state.angle + 90})}>旋转</Button>
                </div>
                <div>
                  <Button disabled={sheetItem.sheetStatus == SHEET_STATUS.recorded} onClick={() => this.markSheet(SHEET_STATUS.recorded)}>标为已录入</Button>
                  <Button disabled={sheetItem.sheetStatus == SHEET_STATUS.un_record} onClick={() => this.markSheet(SHEET_STATUS.un_record)}>标为未录入</Button>
                  <Button disabled={sheetItem.sheetStatus == SHEET_STATUS.invalid} onClick={() => this.markSheet(SHEET_STATUS.invalid)}>标为无效</Button>
                </div>
              </div>
            )
          }
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    sheetCategoryList: state.sheetCategoryList,
    updateSheetStatusSuccess: state.laboratorySheet.updateSheetStatusSuccess
  }
}

export default connect(mapStateToProps, {fetchSheetCategoryList, updateSheetStatus})(LookSheetDialog)
