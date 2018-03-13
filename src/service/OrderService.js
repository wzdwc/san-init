import Sapi from '@/utils/Sapi'
const {post, get, postForm} = Sapi

export default {
    /**
     * 获取监测数据
     * @param  {[type]} prdDetailId [description]
     * @return {[type]}             [description]
     */
    submitForm(data) {
        return postForm(`/url/XXX`, data)
    },
    /**
     * 获取产品信息
     * @param  {[type]} prdId [description]
     * @return {[type]}             [description]
     */
    getProductInfo(prdId) {
        return get(`/url/product/`, { prdId })
    },
    /**
     * 获取产品列表
     * @return {[List]}
     */
    getProductList() {
        return post(`/url/XXX`)
    },
}
