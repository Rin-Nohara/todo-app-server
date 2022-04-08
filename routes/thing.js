const router = require('koa-router')()
const ResultModel = require('../model/result.model')
const { STATUS_CODE_MAP } = require('../model/status.map')

router.prefix('/thing')

router.get('/', async (ctx, next) => {
  ctx.body = new ResultModel({}, STATUS_CODE_MAP.SUCCESS)
})

router.post('/', async (ctx, next) => {
  ctx.body = new ResultModel({}, STATUS_CODE_MAP.SUCCESS)
})

module.exports = router
