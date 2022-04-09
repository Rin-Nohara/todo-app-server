const { seq, userModel, thingModel } = require('../db/index')
const { STATUS_CODE_MAP } = require('../model/status.map')
const {ServiceModel} = require('../model/service.result.model')

async function createThing({name, description, userId}) {

  try {
    const thingInfo = await thingModel.create({
      thingName: name,
      thingDescription: description,
      userId
    })
  
    return new ServiceModel(thingInfo, STATUS_CODE_MAP.SUCCESS)
  } catch (e) {
    return new ServiceModel(null, STATUS_CODE_MAP.CREATE_THING_ERROR, e)
  }
}

async function findThingByUser({userId}) {
  try {
    const thingList = await thingModel.findAll({
      attributes: ['userId','thingName', 'thingDescription'],
      include: [
        {
          model: userModel,
          attributes: ['userName'],
          where: {
            userId
          },
        },
      ],
    })
    return new ServiceModel(thingList, STATUS_CODE_MAP.SUCCESS)
  } catch (error) {
    return new ServiceModel(null, STATUS_CODE_MAP.FIND_THING_ERROR, error.message)
  }
}

module.exports = {
  createThing,
  findThingByUser
}
