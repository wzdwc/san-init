// store.js
import { updateBuilder } from 'san-update/src/index'
import { store } from 'san-store'
import OrderService from '@/service/OrderService'

// 第一个action，处理边界条件和异步请求
store.addAction('changeOrderState', (state, {getState, dispatch}) => {
    // 取出当前订单状态值，如果为空就初始化为1
    // const orderState = getState('orderState')
    // 符合修改条件后，发起异步请求
    OrderService.getOrderInfo(this.prdDetailId).then(res => {
        // 状态码正确，修改store中的订单值
        if (res.status === 200) {
            dispatch('fillOrderState', state)
        }
    }).catch(error => {
        console.log(error)
    })
})
// 同步orderState值
store.addAction('fillOrderState',
    state => updateBuilder().set('orderState', state))
export default {
    async init(id) {
        // 给订单状态一个初始值
        try {
            let orderInfo = await OrderService.getOrderInfo(id)
            store.dispatch('fillOrderState', orderInfo)
        } catch (e) {
            console.log(e.msg)
        } finally {
        }
    },
    isLogin() {
        return false
    }
}

