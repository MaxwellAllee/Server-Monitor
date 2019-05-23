const os = require('os');
const system = require('systeminformation')
'use strict'
cpuStatic = (unit) => {

        let promise = new Promise(function (resolve, reject) {
            system[unit]().then(data => {
                resolve(data)
            })
        })
        return promise
}

module.exports = cpuStatic;
