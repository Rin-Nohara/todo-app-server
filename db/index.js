const { DataTypes } = require("Sequelize");
const seq = require('./db')
const userModel = require('./user.model')
const thingModel = require('./thing.model')

thingModel.belongsTo(userModel, {
  // 创建外键
  foreignKey: 'userId'
})

module.exports = {
  seq,
  userModel,
  thingModel
}
