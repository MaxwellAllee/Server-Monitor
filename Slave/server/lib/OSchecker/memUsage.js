const os = require('os');
const system = require('systeminformation')
'use strict'
memUsage = () => {
    let promise = new Promise(function (resolve, reject) {
        system.mem().then(data => {
            let converter =(number)=> Math.floor(number/10737418.24) / 100
            let info ={used : converter(data.total - data.available), free : converter(data.available), total : converter(data.total)}
            resolve(info)
        })
        
    })
    return promise
}
module.exports = memUsage;