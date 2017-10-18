/**
 * Created by jiangyukun on 2017/10/17.
 */
import React from 'react'

import MenuGroup from './MenuGroup'

interface AsideProps {

}

type AsideState = {
  isOpen: boolean
}

class Aside extends React.Component<AsideProps, AsideState> {
  state = {
    isOpen: false
  }

  render() {
    return (
      <nav className="navbar-default navbar-side">
        <div className="sidebar-collapse">
          <ul className="widget widget-menu unstyled">
            <MenuGroup title={<a><i className="fa fa-chevron-down pull-right"></i>患者管理</a>}>
              <ul className="unstyled">
                <li>
                  <a href="">
                    <i className="icon-inbox"></i>
                    患者信息
                  </a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>治疗情况</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>化验单</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>关注申请</a>
                </li>
              </ul>
            </MenuGroup>

            <MenuGroup title={<a><i className="icon-chevron-up pull-right"></i>医生管理</a>}>
              <ul className="unstyled">
                <li>
                  <a href=""><i className="icon-inbox"></i>医生审核</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>医院管理</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>门诊时间</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>医生钱包</a>
                </li>
              </ul>
            </MenuGroup>

            <MenuGroup title={<a><i className="icon-chevron-up pull-right"></i>订单管理</a>}>
              <ul className="unstyled">
                <li>
                  <a href=""><i className="icon-inbox"></i>问答订单</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>电话咨询订单</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>用户申诉</a>
                </li>
              </ul>
            </MenuGroup>

            <MenuGroup title={<a><i className="icon-chevron-up pull-right"></i>APP维护</a>}>
              <ul className="unstyled">
                <li>
                  <a href=""><i className="icon-inbox"></i>知识库</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>话题</a>
                </li>
              </ul>
            </MenuGroup>

            <MenuGroup title={<a><i className="icon-chevron-up pull-right"></i>聊天系统</a>}>
              <ul className="unstyled">
                <li>
                  <a href=""><i className="icon-inbox"></i>聊天系统</a>
                </li>
              </ul>
            </MenuGroup>

            <MenuGroup title={<a><i className="icon-chevron-up pull-right"></i>系统管理</a>}>
              <ul className="unstyled">
                <li>
                  <a href=""><i className="icon-inbox"></i>账号管理</a>
                </li>
                <li>
                  <a href=""><i className="icon-inbox"></i>权限管理</a>
                </li>
              </ul>
            </MenuGroup>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Aside
