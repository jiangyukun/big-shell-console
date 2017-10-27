/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import {PAGES} from '../../core/constants/pages'
import PatientInfo from '../1-1-patient-info/PatientInfo'
import LaboratorySheet from '../1-3-laboratory-sheet/LaboratorySheet'

interface ContentProps {
  match: any
}

class Content extends React.Component<ContentProps> {
  render() {
    const {PATIENT_INFO, LABORATORY_SHEET} = PAGES
    const {match} = this.props

    return (
      <div className="page-content">
        <Route path={`${match.url}/${PATIENT_INFO}`} component={PatientInfo}/>
        <Route path={`${match.url}/${LABORATORY_SHEET}`} component={LaboratorySheet}/>
      </div>
    )
  }
}

export default Content
