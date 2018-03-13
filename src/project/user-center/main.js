// 为兼容 ES5 浏览器环境（主要是 IE8 ~ IE11）而引入的 polyfill，对兼容性没有要求的项目可以不写此行
import router from './router'
import App from '../../App.san'
import loginInterceptor from '../../utils/login-interceptor'
import store from './store'

// 创建App实例,附加到id为app的div上
new App().attach(document.getElementById('app'))
// 路由监听
router.listen((e, config) => {
    // 在路由发生变化时触发
    console.log(e)
    console.log(config)
    loginInterceptor(e, config, store)
})
// 启动路由
router.start()

