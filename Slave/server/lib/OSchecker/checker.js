const cpuStatic = require('./cpustatic')
const cpuUsage = require('./cpuUsage')
const memUsage = require('./memUsage')
const network = require('./network')
const staticCheckList = ["cpu", "system","osInfo"]
let staticData = []
'use strict'
let firstRun = true
osChecker = () => {
    const staticChecks = () => {
        if (firstRun) {
            staticCheckList.forEach(process => {
                cpuStatic(process).then((results) => {
                    staticData[process] = results
                })
            });
            if (staticData.length === staticCheckList.length) { return staticData }
        }
        else  return {static : staticData}
    }

    let somePromise = Promise.all([staticChecks(),network(firstRun), cpuUsage(), memUsage()]).then(function (values) {
        firstRun = false
         const returnObj= {static:{system :values[0].static.system, cpu : values[0].static.cpu, os : values[0].static.osInfo, network : values},dynamic :{cores : values[2],memory:values[3]} }
        return returnObj
    });
    return somePromise
}

module.exports = osChecker;