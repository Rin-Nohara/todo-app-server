const router = require('koa-router')()
const ResultModel = require('../model/result.model')
const { createThing, findThingByUser, updateThingById } = require('../service/thing.service')

router.prefix('/thing')

router.get('/', async (ctx, next) => {
  const { userId } = ctx.state.user
  const { statusCode, data, msg } = await findThingByUser({userId})
  ctx.body = new ResultModel(data, statusCode, msg)
})

router.post('/', async (ctx, next) => {

  ctx.verifyParams({
    name: { type: "string", required: true },
    description: { type: "string", required: false },
  });

  const { userId } = ctx.state.user
  const { name, description } = ctx.request.body
  const { data, statusCode, msg } = await createThing({name, description, userId})
  ctx.body = new ResultModel({data}, statusCode, msg)
})

router.put('/', async (ctx, next) => {
  ctx.verifyParams({
    thingId: { type: 'number', required: true },
  });

  const { thingId, thingName, thingDescription } = ctx.request.body
  const { data, statusCode, msg } = await updateThingById({thingId, thingName, thingDescription})
  ctx.body = new ResultModel({data}, statusCode, msg)
})

module.exports = router
