const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));
const tcpServer = require("child_process").fork("./tcpserver");

const packets = [];

tcpServer.on("message",data=>{
  packets.push(data);
})

app.get("/data",(req,res)=>{
  res.json(packets);
})

app.set('port', 1112);
app.listen(1112);