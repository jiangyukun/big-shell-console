/**
 * Created by jiangyukun on 2017/6/16.
 */

module.exports = {
  exclude: function (path) {
    if (path.indexOf('node_modules\\jy-app-core') != -1) {
      return false
    }
    return path.indexOf('node_modules') != -1
  },

  include: function (path) {
    if (path.indexOf('node_modules\\jy-app-core') != -1) {
      return true
    }
    return path.indexOf('node_modules') == -1
  }

}
