// 导入所需库
const Sequelize = require("sequelize");



const config = process.env.NODE_ENV === 'dev' ?
              require('../configs/mysql.dev'):
              require('../configs/mysql.prod')

/** sequelize 实例 */
const seq = new Sequelize(config.dbname, config.username, config.password, config.conf);

module.exports = seq
