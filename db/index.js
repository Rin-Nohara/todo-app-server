const { DataTypes } = require("Sequelize");
const seq = require('./db')
const userModel = require('./user.model')
const thingModel = require('./thing.model')

module.exports = {
  seq,
  userModel,
  thingModel
}
