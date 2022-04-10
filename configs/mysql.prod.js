
// TODO 部署抽离配置
module.exports = {
  username: 'root',
  password: process.env.DB_PWD,
  dbname: 'todo_app_db',
  conf: {
    host: "localhost",
    dialect: "mysql",
  }
}