const { seq, userModel } = require('../db/index')
const { ServiceModel } = require('../model/service.result.model')
const { STATUS_CODE_MAP } = require('../model/status.map')

async function createUser({userName, telePhone, password, email}) {
  try{
    const userInfo = await userModel.create({
      userName,
      telePhone,
      password,
      email
    })

    return new ServiceModel(userInfo, STATUS_CODE_MAP.SUCCESS)
  } catch(e) {
    const msg = e.errors[0].message
    let statusCode = STATUS_CODE_MAP.FAIL

    if(msg.includes('unique')) {
      statusCode = STATUS_CODE_MAP.USER_EXIST
    }

    return new ServiceModel(null, statusCode, msg)
  }
}

async function findUser({telePhone, password}) {
  try {
    const userInfo = await userModel.findOne({
      where: {
        telePhone,
        password
      },
      attributes: ["userName", "telePhone", "userEmail"], // 过滤返回字段
    })

    return new ServiceModel(userInfo, STATUS_CODE_MAP.SUCCESS)
  } catch(e) {
    return new ServiceModel(null, STATUS_CODE_MAP.LOGIN_ERROR, e)
  }
}

module.exports = {
  createUser,
  findUser
}
