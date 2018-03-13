import store from '../store'

let loginInterceptor = (e, config) => {
    // 根据router的meta属性是否需要登录
    if (config.meta && config.meta.auth && !store.isLogin()) {
        console.log('not login ')
    } else {
        // 初始化store
        store.init(e.query.id)
    }
}

export default loginInterceptor
