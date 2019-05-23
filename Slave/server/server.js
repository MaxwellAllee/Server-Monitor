
//-- .env --------------------------------------------------------------------
const path = require('path');
require('dotenv').config()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: path.resolve(__dirname, '.env')
  });
}

//-- Dependencies ------------------------------------------------------------
const express = require('express');
const logger = require('morgan');

const { passport } = require('./lib/passport');

//-- Constants ---------------------------------------------------------------
const PORT = process.env.PORT || 3061;
const LOG_MODE = process.env.NODE_ENV === 'production' ? 'common' : 'dev';

//-- Express -----------------------------------------------------------------
const app = express();


//-- Middleware --------------------------------------------------------------
app.use(logger(LOG_MODE));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

//-- Static Server (Production) ----------------------------------------------
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
  console.log(`Client build path: ${clientBuildPath}\n`);
  app.use(express.static(clientBuildPath));
}

//-- Controller Routes -------------------------------------------------------
app.use(require('./controllers'));

//-- React catch-all ---------------------------------------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
//--Checker-------------------------------------------------------------------
let compData = {}
const OsChecker = require("./lib/OSchecker/checker.js");
checkItOut = () => {
  OsChecker().then(function (data) {
    // console.log('\033[2J',data)
    compData = data
    // testing()
  })
}
checkItOut()
//--Socket Client-------------------------------------------------------------
var io = require('socket.io-client');
var socket = io.connect("http://localhost:3011/", {
  reconnection: true
});

refreshRate = 1
whoAmI = process.env.WHOAMI
console.log("I am", whoAmI)
socket.on('news', function (data) {
  console.log(data);
  let count = 0
  sendinfo = () => {
    console.log("sending")
    count++
    OsChecker().then((data) => {
      socket.emit('my other event', { [whoAmI]: data, count: count });
    })
    setTimeout(sendinfo,refreshRate*1000)
  }
  sendinfo()
});




// testing =()=>{
//   console.log("data",compData)
//   setTimeout(checkItOut,1000)
// }
//-- Main --------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}...`);
});
