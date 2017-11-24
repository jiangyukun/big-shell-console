/**
 * Created by jiangyukun on 2017/10/26.
 */
import ListAndTotal from '../../core/interface/ListAndTotal'
import {PatientSheet, SheetItem} from './interface/Sheet'

export function handleLaboratorySheetList(data): ListAndTotal<PatientSheet> {
  return {
    total: data['totalCount'],
    list: data['list'].map(item => ({
      id: item['patient_info_id'],
      patientCode: item['patient_code'],
      mobile: item['user_account'],
      username: item['real_name'],
      remark: item['remark'],
      consoleUpload: item['backend_upload_count'],
      doctorUpload: item['doctor_upload_count'],
      patientUpload: item['patient_upload_count'],
      haveRecorded: item['is_input_count'],
      unRecord: item['is_no_input_count'],
      invalid: item['invalid_count'],
      deleted: item['delete_list_count']
    }))
  }
}

export function handleSheetCategoryList(data): SheetItem[] {
  return data.map((item, index) => {
    let url = 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=249917700,3825414431&fm=85&s=5DCAAC5604B0CC2128786A720300C076'
    if (index % 2 == 0) {
      url = 'http://mobi.vongihealth.com:85/Shell/pictures/13560084607/171108032354148114.png'
    }
    return {
      sheetId: item['assay_id'],
      sheetUrl: item['assay_url'],
      // sheetUrl: url,
      sheetStatus: item['assay_input_status'],
      sheetUploadDateTime: item['assay_upload_time'],
    }
  })
}
