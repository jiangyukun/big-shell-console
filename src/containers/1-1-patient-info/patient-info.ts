/**
 * Created by jiangyukun on 2017/10/18.
 */
export const filters = {
  sex: vt(null, ['男', '女', '未填写']),
  provinces: vt(null, ['浙江', '安徽', '黑龙江']),
}

function vt(values, texts) {
  let options = []

  texts.forEach((text, index) => {
    let value = index + 1
    if (values && values[index]) {
      value = values[index]
    }
    options.push({
      value, text
    })
  })
  return options
}

