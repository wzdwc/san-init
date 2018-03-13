const spawn = require('child_process').spawn

function execute(command, args) {
    return new Promise((resolve, reject) => {
        let exec = spawn(command, args, {
            stdio: 'inherit'
        })
        exec.on('exit', code => {
            if (code === 0) {
                resolve({
                    stdout, stderr, code
                })
            } else {
                reject({
                    stdout, stderr, code
                })
            }
            console.log('child process exit:', code)
        })
        exec.on('close', code => {
            if (code === 0) {
                resolve({
                    stdout, stderr, code
                })
            } else {
                reject({
                    stdout, stderr, code
                })
            }
            console.log('child process close:', code)
        })
    })
}

module.exports = (command, args) => {
    return execute(command, args)
}
