const packets = [];

function addPackets(mal, data) {
  packets.push({
    mal,
    data
  });
  render();
}

function render() {
  let html = '';
  for (const packet of packets) {
    html += `
    <li class="item-content ${packet.mal ? "mpac color-red" : "hpac"}">
      <!-- <div class="item-media">
          <i class="icon my-icon"></i>
      </div> -->
      <div class="item-inner">
        <div class="item-title">
          ${packet.mal ? "Malicious packet" : "Healthy packet"}
          <div class="item-footer">
              ${packet.data}
          </div>
        </div>
      </div>
      </li>
    `;
  }
  $("div.list ul").html(html);
}