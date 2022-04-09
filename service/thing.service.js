const { seq, userModel, thingModel } = require('../db/index')
const { STATUS_CODE_MAP } = require('../model/status.map')
const {ServiceModel} = require('../model/service.result.model')

async function createThing({name, description, userName}) {

  try {
    const thingInfo = await thingModel.create({
      thingName: name,
      thingDescription: description,
      userName
    })
  
    return new ServiceModel(thingInfo, STATUS_CODE_MAP.SUCCESS)
  } catch (e) {
    return new ServiceModel(null, STATUS_CODE_MAP.CREATE_THING_ERROR, e)
  }
}

module.exports = {
  createThing
}
