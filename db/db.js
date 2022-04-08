// 导入所需库
const Sequelize = require("sequelize");
const config = require('../configs/mysql.dev')

/** sequelize 实例 */
const seq = new Sequelize(config.dbname, config.username, config.password, config.conf);

module.exports = seq
