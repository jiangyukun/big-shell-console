/**
 * Created by jiangyukun on 2017/11/22.
 */
interface SheetItem {
  sheetId: string
  sheetUrl: string
  sheetStatus: number
  sheetUploadDateTime: string
}

interface PatientSheet {
  id: string
  patientCode: string
  mobile: string
  username: string
  remark: string
  consoleUpload: number
  doctorUpload: number
  patientUpload: number
  haveRecorded: number
  unRecord: number
  invalid: number
  deleted: number
}

export {PatientSheet, SheetItem}
