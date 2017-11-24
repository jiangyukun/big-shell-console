/**
 * Created by jiangyukun on 2017/11/24.
 */
interface DoctorAuditItem {
  id: string
  mobile: string
  doctorName: string
  hospitalId: string
  hospital: string
  positionId: string
  position: string
  pictureUrl: string
  codeNumber: string
  speciality: string
  auditStatus: string
  createDateTime: string
  remark: string
}

export {DoctorAuditItem}
