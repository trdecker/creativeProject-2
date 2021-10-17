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
      sugBar.style.visibility = "visible";
      let smallerArray = [];
      for (let i = 0; i < 10 && i < matchArray.length; i++) smallerArray.push(matchArray[i]);
      while (sugBar.firstChild) sugBar.removeChild(sugBar.childNodes[0]);
      sugBar.appendChild(document.createTextNode("Suggestions:"));
      for (coin of smallerArray) {
        let newItem = document.createElement("li");
        newItem.textContent = coin.name;
        sugBar.appendChild(newItem);
      }
    }
  });
})

function displayCoin(coin) {
  console.log(coin);
  let sugBar = document.getElementById("sug_bar_list");
  sugBar.style.visibility = "collapse";
  while (sugBar.firstChild) sugBar.removeChild(sugBar.childNodes[0]);

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
}
