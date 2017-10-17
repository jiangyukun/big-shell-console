/**
 * Created by jiangyukun on 2017/10/17.
 */
import React from 'react'

interface HeaderProps {

}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <nav className="navbar navbar-default top-navbar top-navbar">
        <div className="navbar-header">
          <a className="navbar-brand">
            <strong>
              <i className="icon fa fa-plane"></i>
              CONSOLE
            </strong>
          </a>
          <div className="sideNav">
            <i className="fa fa-bars icon"></i>
          </div>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle">
              <i className="fa fa-user fa-fw"></i>
              <i className="fa fa-caret-down"></i>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Header
