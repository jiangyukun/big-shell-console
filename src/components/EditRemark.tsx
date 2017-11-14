/**
 * Created by jiangyukun on 2017/11/9.
 */
import React from 'react'
import Modal from 'app-core/modal/Modal'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import RemarkDialogContent from './other/RemarkDialogContent'

interface EditRemarkProps {
  value?: string
  updateRemark: (newRemark) => void
  updateRemarkSuccess: boolean
  onExited: () => void
}

class EditRemark extends React.Component<EditRemarkProps, any> {
  originalValue = ''

  constructor(props: EditRemarkProps) {
    super(props)
    this.originalValue = props.value
    this.state = {
      show: true,
      showConfirm: false,
      value: props.value || ''
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  close = () => {
    this.setState({show: false})
  }

  confirm = () => {
    this.props.updateRemark(this.state.value)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal
        contentComponent={RemarkDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}>

        <Modal.Header closeButton={true}>
          <Modal.Title>修改备注</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <textarea className="form-control" rows={5} value={this.state.value} onChange={this.handleChange}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose
            onCancel={this.close}
            onConfirm={this.confirm}
            disabled={this.state.value == this.originalValue}
          />
        </Modal.Footer>
      </Modal>
    )
  }
}

export default EditRemark
