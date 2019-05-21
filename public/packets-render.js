let packets = [];

function addPackets(mal, data) {
  packets.push({
    mal,
    data
  });
  render();
}

function render() {
  let html = '';
  let n = 0;
  for (const packet of packets) {
    html += `
    <li class="item-content ${packet.mal ? "mpac text-color-red" : "hpac text-color-green"}">
      <!-- <div class="item-media">
          <i class="icon my-icon"></i>
      </div> -->
      <div class="item-inner"  id="${n}">
        <div class="item-title">
          ${packet.mal ? "Malicious packet" : "Healthy packet"}
          <div class="item-footer">
              ${packet.data}
          </div>
        </div>
      </div>
      </li>
    `;
    n++;
  }
  $("div.list ul").html(html);
}

function renderRatioChart() {
  const numMal = packets.filter(a => a.mal).length;
  const numGood = packets.length - numMal;
  const ctx = $("#ratio-chart")[0].getContext('2d');
  $("#ratio-chart")[0].height = "100px";
  myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["Packet stats"],
      datasets: [{
        label:"Malicious",
        data: [numMal],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
      {
        label:"Normal",
        data: [numGood],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      }]
    },
    options: {
      responsive:true,
      scales: {
        xAxes: [{
          display:false,
          stacked: true,
          
        }],
        yAxes: [{
          display:false,
          stacked: true,
        }]
      }
    }
  });
}