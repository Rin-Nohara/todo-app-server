const { STATUS_CODE_MAP, CODE_DESC_MAP } = require('./status.map')

class ResultModel {
  // TODO status code 由 service 决定，router 只展示文案
  constructor(data, status = STATUS_CODE_MAP.FAIL, ...extra) {
    this.data = data
    this.status = status
    this.message = CODE_DESC_MAP[status] || '未知错误'
    if(extra) {
      this.extra = extra
    }
  }
}

module.exports = ResultModel
