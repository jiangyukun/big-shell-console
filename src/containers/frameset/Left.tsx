/**
 * Created by jiangyukun on 2017/10/17.
 */
import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import Menu from 'antd/lib/menu'

import {getPath} from '../../core/env'
import {PAGES} from '../../core/constants/pages'

interface LeftProps {
  currentPath: string
}

class Left extends React.Component<LeftProps> {
  url: any
  state = {
    open: true
  }

  componentWillMount() {
    this.url = {
      patientInfo: getPath(PAGES.PATIENT_INFO),
      treatSituation: getPath(PAGES.TREAT_SITUATION),
      laboratorySheet: getPath(PAGES.LABORATORY_SHEET),
      followApply: getPath(PAGES.FOLLOW_APPLY),
      doctorAudit: getPath(PAGES.DOCTOR_AUDIT),
      hospitalManage: getPath(PAGES.HOSPITAL_MANAGE),
      clinicDate: getPath(PAGES.CLINIC_DATE),
      doctorWallet: getPath(PAGES.DOCTOR_WALLET),

      qAOrder: getPath(PAGES.QA_ORDER),
    }
  }

  isActive = (page) => {
    return getPath(page) == this.props.currentPath
  }

  getSubMenuClass = (page) => {
    return classnames('app-sub-menu', {active: this.isActive(page)})
  }

  render() {
    const SubMenu = Menu.SubMenu

    const patientInfo = getPath(PAGES.PATIENT_INFO)
    const treatSituation = getPath(PAGES.TREAT_SITUATION)
    const laboratorySheet = getPath(PAGES.LABORATORY_SHEET)
    const followApply = getPath(PAGES.FOLLOW_APPLY)
    const doctorAudit = getPath(PAGES.DOCTOR_AUDIT)
    const hospitalManage = getPath(PAGES.HOSPITAL_MANAGE)
    const clinicDate = getPath(PAGES.CLINIC_DATE)
    const doctorWallet = getPath(PAGES.DOCTOR_WALLET)
    const qAOrder = getPath(PAGES.QA_ORDER)

    return (
      <div className="app-left">
        <div className="app-user">
          <div className="user-name">admin</div>
        </div>
        <div className="app-nav">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            <SubMenu key="sub1" title={<span><span>患者管理</span></span>}>
              <Menu.Item key="5">
                <Link to={patientInfo}>患者信息</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to={treatSituation}>治疗情况</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to={laboratorySheet}>化验单</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to={followApply}>关注申请</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><span>医生管理</span></span>}>
              <Menu.Item key="5">
                <Link to={doctorAudit}>医生审核</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to={hospitalManage}>医院管理</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to={clinicDate}>门诊时间</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to={doctorWallet}>医生钱包</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><span>订单管理</span></span>}>
              <Menu.Item key="5">
                <Link to={qAOrder}>问答订单</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to={hospitalManage}>电话咨询订单</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to={clinicDate}>用户申诉</Link>
              </Menu.Item>
            </SubMenu>

          </Menu>

        </div>
      </div>
    )
  }
}

export default Left
