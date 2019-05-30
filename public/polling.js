setInterval(() => {
  fetch("/data")
    .then(res=>res.json())
    .then(data=>{
      if(data.length!=packets.length){
        packets = data
        render();
        renderRatioChart();
      }
    })
}, 200);