/**
 * Created by jiangyukun on 2017/11/24.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout/'
import Input from 'app-core/form/Input'
import TextArea from 'app-core/form/TextArea'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'

import {ReducerType} from '../../../reducers/index'
import {addHospital} from '../hospital-manage.action'
import Label from '../../../components/element/Label'
import {fetchCityList} from '../../app.action'
import Data from '../../../core/interface/Data'
import ValueText from '../../../core/interface/ValueText'

interface AddHospitalDialogProps {

  provinceList: Data<ValueText[]>
  fetchCityList: (provinceId) => void
  cityList: Data<ValueText[]>
  addHospital: (options) => void
  addHospitalSuccess: boolean
  onExited: () => void
}

class AddHospitalDialog extends React.Component<AddHospitalDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,

    hospitalName: '',
    provinceId: '',
    cityId: '',
    longitude: '',
    latitude: '',
    remark: ''
  }

  close = () => {
    this.setState({show: false})
  }

  onProvinceChange = (provinceId) => {
    if (provinceId) {
      this.props.fetchCityList(provinceId)
    }
    this.setState({provinceId, cityId: ''})
  }

  addHospital = () => {
    this.props.addHospital({
      "hospital_name": this.state.hospitalName,
      "hospital_province": this.state.provinceId,
      "hospital_city": this.state.cityId,
      "hospital_longitude": this.state.longitude,
      "hospital_dimension": this.state.latitude,
      "hospital_remark": this.state.remark,
    })
  }

  componentWillReceiveProps(nextProps: AddHospitalDialogProps) {
    if (!this.props.addHospitalSuccess && nextProps.addHospitalSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal className="add-hospital-dialog" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="确定添加医院吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.addHospital}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>新增医院</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part>
              <Label>医院名称</Label>
            </Part>
            <Part weight={2}>
              <Input value={this.state.hospitalName} onChange={v => this.setState({hospitalName: v})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              <Label>省份</Label>
            </Part>
            <Part weight={2}>
              <Select1 options={this.props.provinceList.data || []} value={this.state.provinceId} onChange={this.onProvinceChange}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              <Label>市</Label>
            </Part>
            <Part weight={2}>
              <Select1 options={this.props.cityList.data || []} value={this.state.cityId} onChange={v => this.setState({cityId: v})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              <Label>经度</Label>
            </Part>
            <Part weight={2}>
              <Input value={this.state.longitude} onChange={v => this.setState({longitude: v})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              <Label>纬度</Label>
            </Part>
            <Part weight={2}>
              <Input value={this.state.latitude} onChange={v => this.setState({latitude: v})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              <Label>备注</Label>
            </Part>
            <Part weight={2}>
              <TextArea value={this.state.remark} onChange={v => this.setState({remark: v})}/>
            </Part>
          </FlexDiv>

          <p className="get-city-position">
            <a target="_blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">http://api.map.baidu.com/lbsapi/getpoint/index.html</a>
            <div>请在此获取经纬度</div>
          </p>

        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state: ReducerType) {
  return {
    provinceList: state.provinceList,
    cityList: state.cityList,
    addHospitalSuccess: state.hospitalManage.addHospitalSuccess
  }
}

export default connect(mapStateToProps, {fetchCityList, addHospital})(AddHospitalDialog)
