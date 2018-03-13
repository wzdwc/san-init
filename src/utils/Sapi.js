import Request from './Request'
function AuthorizationHeader(token) {
    return token || {'Authorization': token}
}

function requestProcess(thenable) {
    return new Promise(function(resolve, reject) {
        thenable.then((response) => {
            let data = response.body
            if (parseInt(response.status) !== 200) {
                reject({status: response.status, message: '服务繁忙'})
            } else if (data.success || parseInt(data.status) === 200) {
                resolve(data.data)
            } else {
                reject(data)
            }
        }).catch(({status, message, response} = {}) => {
            console.error(response)
            reject({code: status, msg: '服务繁忙'})
        })
    })
}

let token = ''
function baseRequest(type, url, params, headers, callback) {
    return Request[type](`/sapi${url}`, params, headers, callback)
}
export default {
    setToken(tokenData) {
        token = tokenData
    },
    getToken() {
        return token
    },
    authHeader() {
        return AuthorizationHeader(token)
    },
    getList(data) {
        return data.list
    },
    post(url, params) {
        return requestProcess(baseRequest('post', url, params, AuthorizationHeader(token)))
    },
    postPercent(url, params, percentCallback) {
        return requestProcess(baseRequest('postPercent', url, params, AuthorizationHeader(token), percentCallback))
    },
    postForm(url, params) {
        return requestProcess(baseRequest('postForm', url, params, AuthorizationHeader(token)))
    },
    postJson(url, params) {
        return requestProcess(baseRequest('postJson', url, params, AuthorizationHeader(token)))
    },
    put(url, params) {
        return requestProcess(baseRequest('put', url, params, AuthorizationHeader(token)))
    },
    del(url, params) {
        return requestProcess(baseRequest('del', url, params, AuthorizationHeader(token)))
    },
    get(url, params) {
        return requestProcess(baseRequest('get', url, params, AuthorizationHeader(token)))
    },
}
