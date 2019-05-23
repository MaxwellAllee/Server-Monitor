const os = require('os');
const system = require('systeminformation')
'use strict'
cpuUsage= () => {
    let promise = new Promise (function(resolve, reject){
        system.currentLoad().then(data => {
                loadArr = data.cpus.map(data =>Math.round(data.load))
               const average = list => list.reduce((prev, curr) => prev + curr) / list.length
               let theAverage = average(loadArr)
            resolve({cores: loadArr, loadAvg : theAverage})})
    })
    return promise   
}
module.exports = cpuUsage;