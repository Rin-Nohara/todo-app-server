const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const parameter = require('koa-parameter')
const koaStatic = require('koa-static')
const path = require('path')

// config
const { jwtSecret } = require('./configs/jwt.config')

// router
const thingRouter = require('./routes/thing')
const userRouter = require('./routes/user')

const auth = jwt({ secret: jwtSecret });
const checkToken = require('./middleware/checkToken')

// error handler
onerror(app)

// middlewares
app.use(parameter(app));
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname, 'public')))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(userRouter.routes(), userRouter.allowedMethods())
app
  .use(auth)
  .use(checkToken)
  .use(thingRouter.routes(), thingRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
