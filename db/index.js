const seq = require('./db')
const userModel = require('./user.model')
const thingModel = require('./thing.model')

// 外键关联
thingModel.belongsTo(userModel, {
  foreignKey: 'userName',
})

module.exports = {
  seq,
  userModel,
  thingModel
}
