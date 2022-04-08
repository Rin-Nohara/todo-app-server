
const { STATUS_CODE_MAP } = require('./status.map')

class ServiceModel {
  constructor(data, statusCode, msg) {
    this.data = data
    this.statusCode = statusCode

    // 超过 400 为失败状态码
    if(statusCode >= 400) {
      this.msg = msg
    }

  }
}

module.exports = {
  ServiceModel,
}
