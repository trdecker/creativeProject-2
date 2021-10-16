document.getElementById("cryptoSubmit").addEventListener("click", (e)=>{
  e.preventDefault();
  //console.log("Test");

  const url = "https://api.coinpaprika.com/v1/coins"
  fetch(url).then(response => response.json()).then(json => {
    let matchArray = [];
    let input = document.getElementById("cryptoInput").value;
    let topTen = 10;
    for (ob of json) {
      if (ob.name.toLowerCase().includes(input.toLowerCase()) && topTen > 0)
      {
        matchArray.push(ob);
        topTen--;
      }
    }
    console.log(matchArray);
  });
})
