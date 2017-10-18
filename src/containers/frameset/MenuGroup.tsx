/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'
import Collapse from 'react-bootstrap/lib/Collapse'

interface MenuGroupProps {
  title: any
}

type MenuGroupState = {
  isOpen: boolean
}

class MenuGroup extends React.Component<MenuGroupProps, MenuGroupState> {
  state = {
    isOpen: false
  }

  handleClick = () => {
    this.setState(oldState => ({
      isOpen: !oldState.isOpen
    }))
  }

  render() {
    return (
        <li onClick={this.handleClick}>
          {this.props.title}
          <Collapse in={this.state.isOpen}>
            {this.props.children}
          </Collapse>
        </li>
    )
  }
}

export default MenuGroup
