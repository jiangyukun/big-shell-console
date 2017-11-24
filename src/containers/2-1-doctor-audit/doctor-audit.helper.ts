/**
 * Created by jiangyukun on 2017/10/26.
 */
import {DoctorAuditItem} from './interface/DoctorAudit'

export function handleDoctorAuditList(data) {
  return {
    total: data['count'],
    list: data['list'].map(item => ({
      id: item['doctor_info_id'],
      mobile: item['doctor_phone'],
      doctorName: item['doctor_name'],
      hospitalId: item['hospital_id'],
      hospital: item['hospital_name'],
      positionId: item['doctor_title_id'],
      position: item['hospital_name'],
      pictureUrl: item['doctor_photo_url'],
      codeNumber: item['doctor_license_url'],
      speciality: item['doctor_specialty'],
      auditStatus: item['check_status'],
      createDateTime: item['regrist_time'],
      remark: item['remark'],
    } as DoctorAuditItem))
  }
}

export function handlePositionList(data) {
  return data.map(item => ({
    value: item['doctor_title_id'], text: item['doctor_title_name']
  }))
}
