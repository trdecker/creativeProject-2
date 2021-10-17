document.getElementById("cryptoSubmit").addEventListener("click", (e)=>{
  e.preventDefault();
  //console.log("Test");

  const url = "https://api.coinpaprika.com/v1/coins"
  fetch(url).then(response => response.json()).then(json => {
    let matchArray = [];
    let match = -1;
    let input = document.getElementById("cryptoInput").value;
    for (ob of json) {
      if (ob.name.toLowerCase().includes(input.toLowerCase())) matchArray.push(ob);
      if (ob.name.toLowerCase() === input.toLowerCase()) match = ob;
    }

    if (match !== -1) displayCoin(match);
    else {
      let sugBar = document.getElementById("sug_bar_list");
      let smallerArray = [];
      for (let i = 0; i < 10 && i < matchArray.length; i++) smallerArray.push(matchArray[i]);
      clearInfo("visible");
      sugBar.appendChild(document.createTextNode("Suggestions:"));
      for (coin of smallerArray) {
        let newItem = document.createElement("li");
        newItem.textContent = coin.name;
        sugBar.appendChild(newItem);
      }

      if (smallerArray.length === 0) sugBar.childNodes[0].textContent = "Sorry, No Sugestions Found";
    }
  });
})

function clearInfo(showVal) {
  let sugBar = document.getElementById("sug_bar_list");
  sugBar.style.visibility = showVal;
  while (sugBar.firstChild) sugBar.removeChild(sugBar.childNodes[0]);

  let check = document.getElementsByClassName("coin_info");
  if (check.length !== 0) {
    while (check.firstChild) check.removeChild(sugBar.childNodes[0]);
    document.getElementsByClassName("page")[0].removeChild(check[0]);
  }
}

function displayCoin(coin) {
  console.log(coin);
  let sugBar = document.getElementById("sug_bar_list");
  clearInfo("collapse");

  let info = document.createElement("div");
  info.className = "coin_info";
  document.getElementsByClassName("page")[0].appendChild(info);

  info.appendChild(document.createTextNode(coin.name));
  let coinStats = document.createElement("div");
  coinStats.className = "coin_stats";
  let temp = document.createElement("h3");
  temp.appendChild(document.createTextNode("Coin symbol: " + coin.symbol));
  coinStats.appendChild(temp);

  temp = document.createElement("h3");
  temp.appendChild(document.createTextNode("Coin ID: " + coin.id));
  coinStats.appendChild(temp);

  temp = document.createElement("h3");
  temp.appendChild(document.createTextNode("Coin Type: " + coin.type));
  coinStats.appendChild(temp);
  info.appendChild(coinStats);

  let coinRank = document.createElement("div");
  coinRank.className = "coin_rank";
  temp = document.createElement("h3");
  let rank = (coin.rank !== 0 ? coin.rank : "Not Ranked");
  temp.appendChild(document.createTextNode("Rank of Coin: " + rank));
  if (!coin.is_active) temp.appendChild(document.createTextNode(" (Inactive Coin)"));
  coinRank.appendChild(temp);
  info.appendChild(coinRank);
}
