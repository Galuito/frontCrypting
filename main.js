const express = require("express");
const https = require("https");
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5120;
app.use(cors());

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'html', "index.html"));
})

app.get('/success', (req, res) =>{
  res.sendFile(path.join(__dirname, 'html', "success.html"));
})

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

// To access https://127.0.0.1:5120
sslServer.listen(port, ()=>{
  console.log("SSL Frontend listening on port", port)
})