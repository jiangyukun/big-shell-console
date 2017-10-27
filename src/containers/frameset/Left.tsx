/**
 * Created by jiangyukun on 2017/10/17.
 */
import React from 'react'
import classnames from 'classnames'

interface LeftProps {

}

class Left extends React.Component<LeftProps> {
  state = {
    open: true
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
                  <li className="app-sub-menu">患者信息</li>
                  <li className="app-sub-menu">治疗情况</li>
                  <li className="app-sub-menu">化验单</li>
                  <li className="app-sub-menu">关注申请</li>
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
