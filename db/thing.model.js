const { DataTypes } = require('sequelize')
const seq = require('./db')

const Thing = seq.define('thing', {
  thingName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thingDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = Thing
