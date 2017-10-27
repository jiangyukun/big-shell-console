/**
 * Created by jiangyukun on 2017/10/17.
 */
import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'

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
    }
  }

  isActive = (page) => {
    return getPath(page) == this.props.currentPath
  }

  getSubMenuClass = (page) => {
    return classnames('app-sub-menu', {active: this.isActive(page)})
  }

  render() {
    return (
      <div className="app-left">
        <div className="app-user">
          <div className="user-name">admin</div>
        </div>
        <div className="app-nav">
          <div className={classnames('app-nav-menu', {'open': this.state.open})}>
            <div className="menu-title">
              <img src={require('./icon/patient-menu.svg')}/>
              患者管理
            </div>
            <div className="pull-right">

            </div>
            {
              this.state.open && (
                <ul>
                  <li className={this.getSubMenuClass(PAGES.PATIENT_INFO)}>
                    <Link to={this.url.patientInfo}>患者信息</Link>
                  </li>
                  <li className={this.getSubMenuClass(PAGES.TREAT_SITUATION)}>
                    <Link to={this.url.treatSituation}>治疗情况</Link>
                  </li>
                  <li className={this.getSubMenuClass(PAGES.LABORATORY_SHEET)}>
                    <Link to={this.url.laboratorySheet}>化验单</Link>
                  </li>
                  <li className={this.getSubMenuClass(PAGES.FOLLOW_APPLY)}>
                    <Link to={this.url.followApply}>关注申请</Link>
                  </li>
                </ul>
              )
            }

          </div>
        </div>
      </div>
    )
  }
}

export default Left
