const exec = require('./command-exec.js')
let {
    args,
    config
} = require('./command-params.js')
let {
    port = 8080,
    listen = 80
} = config
port = parseInt(port)
let projectPortMap = {}
args.forEach((p, index) => {
    let usePort = port + index
    projectPortMap['/san/' + p +'/'] = {
        url: `http://localhost:${usePort}/`,
        port: usePort
    }
})

args.forEach((p, index) => {
    let usePort = port + index
    exec('node', ['./build/dev-server.js', p, `port=${usePort}`, `proxy=${JSON.stringify(projectPortMap)}`]).catch(e => {
        console.log('exec ', e)
    })
})



var http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({});

proxy.on('error', function(err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong.');
});
let lastUrl = ''
let parseUrl = require('url').parse
const opn = require('opn');
var server = http.createServer(function(req, res) {
    try {
        let url = req.url
        let { pathname } = parseUrl(url)
        pathname = pathname.replace('index.html', '')
        let refer = parseUrl(req.headers.referer || '')
        let hasProxy = projectPortMap[pathname]
        if (hasProxy) {
            lastUrl = hasProxy.url
        } else {
            pathname = refer.pathname && refer.pathname.replace('index.html', '')
            if (pathname) {
                hasProxy = projectPortMap[pathname]
                if (hasProxy) {
                    lastUrl = hasProxy.url
                }
            }
        }
        if (lastUrl) {
            let opt = { target: lastUrl }
            req.url = req.url.replace('index.html', '')
            proxy.web(req, res, opt);
        } else {
            res.end('end')
        }
    } catch(e) {
        console.error(e)
    }
});
server.listen(listen);
Object.keys(projectPortMap).forEach(k => {
    opn(`http://localhost:${listen}${k}`)
})
