/**
 * Created by jiangyukun on 2017/10/17.
 */
import React from 'react'

interface AsideProps {

}

class Aside extends React.Component<AsideProps> {
  render() {
    return (
      <nav className="navbar-default navbar-side">
        <div className="sidebar-collapse">
          <ul className="widget widget-menu unstyled">
            <li className="active">
              <a>
                DashBoard
              </a>
            </li>
            <li className="active">
              <a>
                DashBoard
              </a>
            </li>
          </ul>

          <ul className="widget widget-menu unstyled">
            <li className="active">
              <a>
                DashBoard
              </a>
            </li>
            <li className="active">
              <a>
                DashBoard
              </a>
            </li>
          </ul>
          <ul className="widget widget-menu unstyled">
            <li>
              <a>
                <i className="icon-chevron-up pull-right">
                </i>
                More Pages
              </a>
              <ul className="unstyled in collapse" style={{height: 'auto'}}>
                <li>
                  <a href="">
                    <i className="icon-inbox"></i>
                    Login
                  </a>
                </li>
                <li><a href="other-user-profile.html"><i className="icon-inbox"></i>Profile </a></li>
              </ul>
            </li>
            <li className="active">
              <a>
                DashBoard
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Aside
