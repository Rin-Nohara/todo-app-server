const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
const { jwtSecret } = require("../configs/jwt.config");
const { STATUS_CODE_MAP, CODE_DESC_MAP } = require('../model/status.map')
 
async function checkToken(ctx, next) {
  let url = ctx.request.url;
  // 登录 注册 不用检查 token
  if (url == "/user/login" || url == '/user/') await next();
  else {
    let token = ctx.request.headers["authorization"];
    token = token.replace('Bearer ', '')
    // 解码
    let payload = await verify(token, jwtSecret);
    let { exp: timeout } = payload;
    let currentDate = Math.floor(new Date().getTime()/1000);
    if (currentDate <= timeout) {
      // 未过期
      await next();
    } else {
      const code = STATUS_CODE_MAP.TOKEN_EXPIRES
      //过期
      ctx.body = {
        status: code,
        message: CODE_DESC_MAP[code]
      };
    }
  }
}
 
module.exports = checkToken
