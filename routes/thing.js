const router = require('koa-router')()
const ResultModel = require('../model/result.model')
const { createThing } = require('../service/thing.service')

router.prefix('/thing')

router.get('/', async (ctx, next) => {
  ctx.body = new ResultModel({}, 200)
})

router.post('/', async (ctx, next) => {

  ctx.verifyParams({
    name: { type: "string", required: true },
    description: { type: "string", required: false },
  });

  const { userName } = ctx.state.user
  const { name, description } = ctx.request.body
  const { data, statusCode, msg } = await createThing({name, description, userName})
  ctx.body = new ResultModel({data}, statusCode, msg)
})

module.exports = router
