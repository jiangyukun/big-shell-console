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
import Label from '../../../components/element/Label'
import Data from '../../../core/interface/Data'
import ValueText from '../../../core/interface/ValueText'
import {HospitalItem} from '../interface/Hospital'
import {fetchCityList} from '../../app.action'
import {updateHospital} from '../hospital-manage.action'

interface UpdateHospitalDialogProps {
  hospital: HospitalItem
  provinceList: Data<ValueText[]>
  fetchCityList: (provinceId) => void
  cityList: Data<ValueText[]>
  updateHospital: (options) => void
  updateHospitalSuccess: boolean
  onExited: () => void
}

class UpdateHospitalDialog extends React.Component<UpdateHospitalDialogProps> {
  hospital_id: string
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

  updateHospital = () => {
    this.props.updateHospital({
      "hospital_id": this.hospital_id,
      "hospital_name": this.state.hospitalName,
      "hospital_province": this.state.provinceId,
      "hospital_city": this.state.cityId,
      "hospital_longitude": this.state.longitude,
      "hospital_dimension": this.state.latitude,
      "hospital_remark": this.state.remark,
    })
  }

  componentWillMount() {
    const {
      create_time, hospital_city, hospital_city_id, hospital_dimension,
      hospital_id, hospital_longitude, hospital_name,
      hospital_province, hospital_province_id, hospital_remark, is_hide
    } = this.props.hospital
    this.hospital_id = hospital_id
    this.setState({
      hospitalName: hospital_name,
      provinceId: hospital_province_id,
      cityId: hospital_city_id,
      longitude: hospital_longitude,
      latitude: hospital_dimension,
      remark: hospital_remark
    })
  }

  componentWillReceiveProps(nextProps: UpdateHospitalDialogProps) {
    if (!this.props.updateHospitalSuccess && nextProps.updateHospitalSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal className="update-hospital-dialog" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="确定更新医院信息吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.updateHospital}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>更新医院</Modal.Title>
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

          <div className="get-city-position">
            <a target="_blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">http://api.map.baidu.com/lbsapi/getpoint/index.html</a>
            <div>请在此获取经纬度</div>
          </div>

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
    updateHospitalSuccess: state.hospitalManage.updateHospitalSuccess
  }
}

export default connect(mapStateToProps, {fetchCityList, updateHospital})(UpdateHospitalDialog)
