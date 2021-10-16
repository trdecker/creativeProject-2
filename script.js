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
      sugBar.hidden = false;
      while (sugBar.firstChild) sugBar.removeChild(sugBar.childNodes[0]);
      for (coin of smallerArray) {
        let newItem = document.createElement("li");
        newItem.textContent = coin.name;
        sugBar.appendChild(newItem);
      }
    }
  });
})

function displayCoin(coin) {
  console.log("MATCH");
  let sugBar = document.getElementById("sug_bar_list");
  sugBar.hidden = true;
}
