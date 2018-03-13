import { router } from 'san-router'
import About from '../views/About/index.san'
import Home from '../views/Home/index.san'
// =============路由配置，监听，启动===============
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
routes.forEach(item => {
    router.add({
        ...item,
        target: '#main',
    })
})
// 设置路由模式 'html5 | hash'
router.setMode('html5')

export default router

