const pythonPath = "python"

// Setup tensorflow model server
const { spawn } = require('child_process');
const tf = spawn(pythonPath,["-u","sniff.py"],{
  detached:true,
  stdio:['pipe','pipe',process.stderr]
});

tf.stdout.on("data",d=>{
  const data = d.toString().trim();
  if(data==="ok") console.log("TensorFlow initialized");
  console.log("Tf output:",data);
  if(data.startsWith("Output: ")){
    const json = JSON.parse(data.substring(7));
    json.srcip = remoteAddresses.get(json.data);
    remoteAddresses.delete(json.data);
    packetCallback(json);
  }
})

const remoteAddresses = new Map();
let packetCallback = console.log
const isHex = str => parseInt(str,16).toString(16)===str.toLowerCase();

// TCP listener
const net = require("net");

const server = net.createServer(socket=>{
  console.log("Connection received from address: ",socket.remoteAddress);
  socket.on("data",data=>{
    let stringified = data.toString('utf8').trim();
    if(!isHex(stringified)){
      const buf = Buffer.from(stringified,'utf-8');
      stringified = buf.toString('hex');
    }
    console.log(stringified);
    remoteAddresses.set(stringified.substring(0,30),socket.remoteAddress);
    tf.stdin.write(stringified+"\n");
  });
})


module.exports = {
  start(){
    server.listen(1111,'localhost');
    console.log("TCP server started on 1111");
  },
  setPacketCallback(cb){
    packetCallback = cb;
  }
};