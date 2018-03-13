# 项目描述
    参照vue全家桶，配置的san的全家桶，包含webpack，eslint，san-touer,san-store
# usage
### 安装依赖
npm i

### 运行项目
npm run dev projectName
本地访问路径：localhost/san-test/user-center/index.html
### 项目文档
```
项目结构

--- san-init
        |
        build ----- webpack配置
        |
        config --- node配置
        |
        src --
        |    |
        |   biz-components
        |    |
        |    components
        |    |
        |    project
        |    |    |
        |    |   model(user-center)
        |    |       |
        |    |       router ---------- 相关路由
        |    |       |
        |    |       store -------- 相关的状态更新
        |    |       |
        |    |       utils ------- 相关的工具
        |    |       |
        |    |       views ------- 每个页面
        |    |       |
        |    |       main.js ------ webpack entry
        |    |
        |    service ------- SAPI 统一处理
        |    |
        |    utils -------- 基础工具
        |
        static
        |
        index.html ------ 统一spa模板
```
### 路由说明
> 路由使用方法：[san-router](https://github.com/ecomfe/san-router)


路由增加meta，进行相关的业务配置。
例如:此页面是否需要登录：

```
const routes = [
    {
        rule     : '/',
        Component: Home,
        meta     : {auth: true}
    },
    {
        rule     : '/about/:id',
        Component: About,
    },
]
```

### 全局service

### store
> 使用方法：[san-store](https://github.com/ecomfe/san-store)




