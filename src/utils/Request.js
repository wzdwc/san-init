const Superagent = require('superagent')

function object2KeyValueParnter(obj) {
    if (typeof obj !== 'object') {
        return []
    }
    let params = []
    Object.keys(obj).forEach(k => {
        let val = obj[k]
        if (val !== '' && val !== undefined && val !== null) {
            if (Array.isArray(val)) {
                val = val.join(',')
            } else if (val instanceof Date) {
                val = val.getTime()
            }
            params.push(`${k}=${encodeURIComponent(val)}`)
        }
    })
    return params
}
function serialize(obj) {
    let params = object2KeyValueParnter(obj)
    return params.join('&')
}
Superagent.serialize['application/x-www-form-urlencoded'] = serialize

export default {
    postForm(url, params, header) {
        return Superagent.post(url).withCredentials().type('form').send(params).set(header)
    },
    post(url, params, header) {
        return Superagent.post(url).withCredentials().send(params).accept('application/json').set(header)
    },
    postPercent(url, params, header, percentCallback) {
        return Superagent.post(url).withCredentials().send(params).set(header).on(`progress`, e => {
            if (typeof percentCallback === 'function') {
                percentCallback(e)
            }
        })
    },
    put(url, params, header) {
        params = serialize(params)
        return Superagent.put(`${url}?${params}`).withCredentials().type('json').send().set(header)
    },
    get(url, params, header = {}) {
        let buildGet = Superagent.get(url).withCredentials()
        object2KeyValueParnter(params).forEach(param => {
            buildGet = buildGet.query(param)
        })
        return buildGet.set(header)
    },
    del(url, params, header) {
        return Superagent.del(url).withCredentials().query(params).set(header)
    }
}
