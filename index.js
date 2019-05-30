const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
const tcpServer = require("./tcpserver");
tcpServer.start();

const packets = [];

tcpServer.setPacketCallback(data=>{
  packets.push(data);
})

app.get("/data",(req,res)=>{
  res.json(packets);
})

app.set('port', 1112);
app.listen(1112);