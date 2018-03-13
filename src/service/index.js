import san from 'san'
san.prototype.$orderService = require('./OrderService.js').default || require('./OrderService.js')['default']
