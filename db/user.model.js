const { DataTypes } = require('sequelize')
const seq = require('./db')

const User = seq.define('user', {
  // 在这里定义模型属性
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '123456'
  },
  telePhone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  userEmail: {
    type: DataTypes.STRING,
  },
}, {
});

module.exports = User
