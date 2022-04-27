"use strict";
// mikro framework
const express = require("express");
const cors = require("cors");
const config = require("./config");
// headers-den gelen tehlukelerden qorunmaq ucun
const bodyParser = require("body-parser");
const helmet = require("helmet");
const ratelimit = require("express-rate-limit");
const server = require("./server");
const functions = require("firebase-functions");
var compression = require('compression');
const { internalerror, resError } = require("./errorhandle/api404Error");

// var corsOptions = {
//   origin: 'http://localhost:8080',
// }

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression()); //Compress all routes
const limitter = ratelimit({
  windowMs: 10000,
  max: 10,
});

//check for the referrer domain
// app.use('/*', function(req, res, next) {
//   if (req.headers.referer!='http://localhost:8081/') {
//   console.log(req.headers.referer)
//      next(new Error('Host error'))
//   }
//   next();
// });
// app.use(busboy)
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    dangerouslyDisableDefaultSrc: false,
    directives: {
      "script-src": ["'self'", "securecoding.com"],
      "style-src": null,
    },
  })
);

app.use(
  helmet.expectCt({
    maxAge: 40,
    enforce: false,
    reportUri: "https://securecoding.com/report",
  })
);
app.use(
  helmet.dnsPrefetchControl({
    allow: false,
  })
);
app.use(
  helmet.frameguard({
    action: "deny",
  })
);
app.use(
  helmet.hsts({
    maxAge: 123456,
    includeSubDomains: true,
  })
);
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy());

app.use(express.json());
app.use(server);
app.use(internalerror);
app.use(resError);
exports.app = functions.https.onRequest(app);
app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);

// let a=0
// setInterval(() => {
//     axios.get(`http://localhost:2022/api/filter/contents/AZ/NetFlix/3d8baO60v8MYvyqqq5P8/66DRjI6xteohPI6FUJQY`)
// .then(response=>{
//    a++
// console.log(response.status,a)
// })
// }, 1000);
