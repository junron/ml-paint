$(document).on("click",".hpac .item-inner",e=>{
  const {currentTarget:target} = e;
  const packet = packets[parseInt(target.id)];
  console.log(packet);
  const dialog = Framework7App.dialog.create({
    title: "Healthy packet detected",
    text: `<b>Confidence: ${Math.floor(packet.confidence*100)}%<br>
    Source IP: ${packet.srcip}<br>
    Destination IP: ${packet.destip}</b>`,
    buttons:[{
      text:"OK"
    }]
  });
  dialog.open();
})

$(document).on("click",".mpac .item-inner",e=>{
  const {currentTarget:target} = e;
  const packet = packets[parseInt(target.id)];
  console.log(packet);
  const dialog = Framework7App.dialog.create({
    title: "Malicious packet detected",
    text: `<b>Confidence: ${Math.floor(packet.confidence*100)}%<br>
    Source IP: ${packet.srcip}<br>
    Destination IP: ${packet.destip}</b>`,
    buttons:[{
      text:"OK"
    }]
  });
  dialog.open();
})

