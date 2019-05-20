var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 8080;
app.listen(port);
var ipAddress = process.env.IP_ADDRESS || '127.0.0.1';

console.log(`App is running on ${ipAddress}:${port}`);