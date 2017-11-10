/**
 * Created by jiangyukun on 2017/11/10.
 */
import React from 'react'
import {browserParams} from './core/env'

interface EnvCheckerProps {

}

class EnvChecker extends React.Component<EnvCheckerProps> {
  container: HTMLDivElement

  componentDidMount() {
    browserParams.scrollWidth = this.container.offsetWidth - this.container.clientWidth
  }

  render() {
    return (
      <div ref={c => this.container = c} style={{width: '100px', height: '100px', overflow: 'auto'}}>
        <div style={{width: '60px', height: '200px'}}></div>
      </div>
    )
  }
}

export default EnvChecker
