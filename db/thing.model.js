const { DataTypes } = require('sequelize')
const seq = require('./db')
const userModel = require('./user.model')

const Thing = seq.define('thing', {
  thingName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thingDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 可以创建外键：
  userName: {
    type: DataTypes.STRING,
    references: {
      // 这是对另一个模型的参考
      model: userModel,
      // 这是引用模型的列名
      key: 'userName',
    }
  },
});

module.exports = Thing
