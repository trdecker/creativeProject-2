document.getElementById("cryptoSubmit").addEventListener("click", (e)=>{
  e.preventDefault();
  console.log("Test");

  const url = "https://api.coinpaprika.com/v1/coins"
  fetch(url).then(response => response.json()).then(json => {
    console.log(json);
  });
})
