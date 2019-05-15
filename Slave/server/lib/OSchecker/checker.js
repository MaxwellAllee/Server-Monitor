const os = require('os');
var getos = require('getos')
osChecker = () => {
    let info = {
        plat: os.platform(),
        arch: os.arch(),
        uptime: (((os.uptime()/60)/60)/24+" days"),
        freemem: os.freemem()/1000000000,
        totalmem: os.totalmem()/1000000000,
        usedmem: (os.totalmem() - os.freemem())/10000000000,
        test: getos(function(e,os) {
            if(e) return console.log(e)
            console.log("Your OS is:" +JSON.stringify(os))
          }),
        address: os.address
    }


    return info
}

module.exports = osChecker;