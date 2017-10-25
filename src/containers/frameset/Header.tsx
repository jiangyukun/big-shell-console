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
              大贝壳控制台
            </strong>
          </a>

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
