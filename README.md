## TODO

### 开发注意

router 返回数据结构已经抽象为 ResultModel 具体的文案，只需要透传 service 层的 statusCode。
具体文案需要在 model/status.map.js 中设置。

service 返回数据结构已经抽象为 ServiceModel，statusCode 在 service 决定，对应的前台展示文案由 router 决定。

> 业务比较简单，撤销 controller 层

### 重要且紧急

- 登录逻辑，现在 username 使用 deviceID 代替，后续替换为登录逻辑

### 重要不紧急

- 返回状态码和对应文案支持单独配置
