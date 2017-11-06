/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import {PAGES} from '../../core/constants/pages'
import PatientInfo from '../1-1-patient-info/PatientInfo'
import LaboratorySheet from '../1-3-laboratory-sheet/LaboratorySheet'
import DoctorAudit from '../2-1-doctor-audit/DoctorAudit'
import HospitalManage from '../2-2-hospital-manage/HospitalManage'
import QuestionsAndAnswers from '../3-1-questions-answers/QuestionsAndAnswers'

interface ContentProps {
  match: any
}

class Content extends React.Component<ContentProps> {
  render() {
    const {PATIENT_INFO, LABORATORY_SHEET, DOCTOR_AUDIT, HOSPITAL_MANAGE, QUESTIONS_ANSWERS} = PAGES
    const {match} = this.props

    return (
      <div className="page-content">
        <Route path={`${match.url}/${PATIENT_INFO}`} component={PatientInfo}/>
        <Route path={`${match.url}/${LABORATORY_SHEET}`} component={LaboratorySheet}/>
        <Route path={`${match.url}/${DOCTOR_AUDIT}`} component={DoctorAudit}/>
        <Route path={`${match.url}/${HOSPITAL_MANAGE}`} component={HospitalManage}/>

        <Route path={`${match.url}/${QUESTIONS_ANSWERS}`} component={QuestionsAndAnswers}/>
      </div>
    )
  }
}

export default Content
