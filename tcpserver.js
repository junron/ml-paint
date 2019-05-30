const pythonPath = "python"

// Setup tensorflow model server
const { spawn } = require('child_process');
const tf = spawn(pythonPath,["-u","sniff.py"],{
  detached:true,
  stdio:['pipe','pipe',process.stderr]
});

tf.stdout.on("data",d=>{
  const data = d.toString();
  console.log("Tf output:",data);
  if(data.startsWith("Output: ")){
    const json = JSON.parse(data.substring(7));
    json.srcip = remoteAddresses.get(json.data);
    remoteAddresses.delete(json.data);
    process.send(json);
  }
})

const remoteAddresses = new Map();
// TCP listener
const net = require("net");

const server = net.createServer(socket=>{
  console.log("Connection received from address: ",socket.remoteAddress);
  socket.on("data",data=>{
    stringified = data.toString('utf8')
    remoteAddresses.set(stringified.trim().substring(0,30),socket.remoteAddress);
    tf.stdin.write(stringified);
  });
})

server.listen(1111,'localhost');
console.log("TCP server started on 1111");