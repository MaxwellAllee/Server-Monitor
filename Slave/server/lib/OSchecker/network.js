const os = require('os');
const system = require('systeminformation')
let static
'use strict'
network = (run) => {
    let ipArray = []
    if (run) {
        let promise = new Promise(function (resolve, reject) {
            system.networkInterfaces().then(data => {
                data.forEach( ip => ipArray.push({iface:ip.iface,ip4: ip.ip4, internal : ip.internal}))
                resolve(ipArray)
            })
        })
        static = promise
    }
        return static


}

module.exports = network;
