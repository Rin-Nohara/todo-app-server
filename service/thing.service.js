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

async function updateThingById({ thingId, thingName, thingDescription }) {
  try {
    const res = await thingModel.update({
      thingName,
      thingDescription
    }, {
      where: {
        id: thingId
      }
    })
    return new ServiceModel(res, STATUS_CODE_MAP.SUCCESS)
  } catch (error) {
    return new ServiceModel(null, STATUS_CODE_MAP.UPDATE_FAIL, error.message)
  }
}

module.exports = {
  createThing,
  findThingByUser,
  updateThingById
}
