export default {
    isIOS() {
        return this.isIPhone() || this.isIPad()
    },
    userAgent() {
        return navigator.userAgent
    },
    isIPhone() {
        return this.userAgent().indexOf('iPhone') > -1
    },
    isIPad() {
        return this.userAgent().indexOf('iPad') > -1
    },
    inWeChat() {
        return this.userAgent().indexOf('MicroMessenger') > -1
    },
    inAlipay() {
        return this.userAgent().indexOf('AlipayClient') > -1
    },
    setTitle(title) {
        document.title = title
        if (this.isIOS()) {
            const i = document.createElement('iframe')
            i.src = '/favicon.ico'
            i.style.display = 'none'
            i.onload = function() {
                setTimeout(function() {
                    i.remove()
                }) // 1
            }
            document.body.appendChild(i)
        }
    }
}
