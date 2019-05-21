$(document).on("click",".hpac .item-inner",e=>{
  const {currentTarget:target} = e;
  const packet = packets[parseInt(target.id)];
  console.log(packet);
  const dialog = Framework7App.dialog.create({
    title: "Normal packet detected",
    text: "Normal packet detected with accuracy 100%",
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
    text: "Malicious packet detected with accuracy 100%",
    buttons:[{
      text:"OK"
    }]
  });
  dialog.open();
})

