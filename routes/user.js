const router = require('koa-router')()
const ResultModel = require('../model/result.model')

const { createUser, findUser } = require('../service/user.service')

router.prefix('/user')

// 注册
router.post('/', async (ctx, next) => {
  const { request } = ctx
  const { userName, telePhone, password, email } = request.body
  const { statusCode, data, msg } = await createUser({userName, telePhone, password, email})

  ctx.body = new ResultModel({}, statusCode, msg)
})

router.get('/', async (ctx, next) => {
  const { telePhone, password } = ctx.query
  const { statusCode, data, msg } = await findUser({telePhone, password})

  if(data) { // 登录成功，jwt
    
  }

  ctx.body = new ResultModel({}, statusCode, msg)
})

module.exports = router
