# mock 使用说明

## 技术实现

- mockjs：用于生成随机数据；
- mock-filter-middleware.js：数据 mock 中间件，用于拦截需要 mock 的请求，并返回相应的 mock 数据（通过 fs 实时返回 mock 数据）；

## 示例文件

- config.sample.json：mock 配置的示例文件，如果要使配置生效，请新建一个*config.json*作为配置文件；
- mockData.sample.js：mock 数据的示例文件（支持使用 mock.js）；

## config.js 字段说明

_config.js 用于导出 key-value 形式的 mock 配置_

例：

```javascript
module.exports = {
  'GET /api/hybrid/admin/user_list': {
    filename: 'mockData.sample.js',
    delay: 1000,
  },
}
```

- key：表示要 mock 的 url，支持在 url 中增加 method 前缀，用于 mock 指定 method（PUT、DELETE、POST、GET）的 url，其中的 method 大小写不敏感；（例："GET test/get_data" 或 "get test/get_data"）
- value：value 支持字符串形式和对象形式的配置
  1. 对象形式：
  ```json
  {
    // mock 数据的文件名称（默认从 config/mock 路径查找，也可以在 server 中自定义路径）
    "filename": "mockData.sample.js",
    // mock 数据延迟返回，以 ms 为单位（可以使用这个字段做请求的超时模拟）
    "delay": 1000
  }
  ```
  2. 字符串形式：“mockData.sample.js”，是对象的简写形式，等价于如下对象：
  ```json
  {
    "filename": "mockData.sample.js",
    "delay": 0
  }
  ```
