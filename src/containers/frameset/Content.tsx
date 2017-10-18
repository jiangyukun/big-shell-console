/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import PatientInfo from '../1-1-patient-info/PatientInfo'

interface ContentProps {
  match: any
}

class Content extends React.Component<ContentProps> {
  render() {
    const {match} = this.props

    return (
      <div className="page-content">
        <Route path={`${match.url}/patient-info`} component={PatientInfo}/>
      </div>
    )
  }
}

export default Content
