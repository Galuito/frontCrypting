const express = require("express");
const https = require("https");
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5120;

app.get('/', (req, res) =>{
  res.send('Hello World');
})

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(port, ()=>{
  console.log("SSL Frontend listening on port", port)
})