const { seq, userModel, thingModel } = require('../db/index')

async function createThing({name, description}) {
  // todo 中间件获取当前用户的设备id
  const thingInfo = await thingModel.create({
  	thingName: name,
  	thingDescription: description,
    userName: ''
	})

  return thingInfo
}

module.exports = {
  createThing
}
