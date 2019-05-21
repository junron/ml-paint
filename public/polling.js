setInterval(() => {
  fetch("./output.json")
    .then(res=>res.json())
    .then(data=>{
      if(data.length!=packets.length){
        packets = data;
        render();
      }
    })
}, 10);