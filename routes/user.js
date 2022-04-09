const router = require('koa-router')()
const ResultModel = require('../model/result.model')
const jwt = require('jsonwebtoken')

const { createUser, findUser } = require('../service/user.service')
const { jwtSecret, expiresIn } = require('../configs/jwt.config')

router.prefix('/user')

// 注册
router.post('/', async (ctx, next) => {
  const { request } = ctx
  const { userName, telePhone, password, email } = request.body
  const { statusCode, data, msg } = await createUser({userName, telePhone, password, email})

  ctx.body = new ResultModel({}, statusCode, msg)
})

// 登录
router.get('/', async (ctx, next) => {
  const { telePhone, password } = ctx.query

  // 验证参数格式
  ctx.verifyParams({
    telePhone: { type: "string", required: true },
    password: { type: "string", required: true },
  });

  const { statusCode, data } = await findUser({telePhone, password})

  if(data) { // 登录成功，jwt
    const { _id, telePhone, userName, userId } = data;
    // 生成 token
    const token = jwt.sign({ _id, telePhone, userName, userId }, jwtSecret, { expiresIn });
    return ctx.body = new ResultModel({
      token
    }, statusCode)
  }

  ctx.body = new ResultModel({}, statusCode)
})

module.exports = router
