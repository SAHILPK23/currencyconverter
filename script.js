let getRateBtn = document.querySelector("button");
let inputNum = document.querySelector("input");
let showRate = document.getElementById("erate");
let fromImg = document.querySelector("#from img");
let toImg = document.querySelector("#to img");
let fromCountry = document.querySelector("#from select");
let toCountry = document.querySelector("#to select");
let swapBtn = document.getElementById("icon");
let dropLists = document.querySelectorAll("#drop-list select");


const apiKey = "ab9e23b5df7921b658261939";


function choosedCountry() {
  for (let i = 0; i < 2; i++) {
    for (country in country_list) {
      let selected;
      if (i == 0) {
        selected = country == "USD" ? "Selected" : "";
      } else {
        selected = country == "INR" ? "Selected" : "";
      }
      let optTag = `<option value="${country}" ${selected}>${country}</option>`;
      dropLists[i].insertAdjacentHTML("beforeend", optTag);
    }
  }
  changeFlag();
}



function changeFlag() {
  let flagCode = country_list[fromCountry.value];
  fromImg.src = `https://flagsapi.com/${flagCode}/flat/32.png`;
  flagCode = country_list[toCountry.value];
  toImg.src = `https://flagsapi.com/${flagCode}/flat/32.png`;
}

fromCountry.onchange = () => {
  changeFlag();
};

toCountry.onchange = () => {
  changeFlag();
};


function getExchangeRate() {
  let amount = inputNum.value;
  if (amount == "" || amount == "0") {
    inputNum.value = "1";
    amount = 1;
  }
  showRate.innerHTML = "Getting Exchange Rate....";
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCountry.value}`;
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      let exchangeRate = data.conversion_rates[toCountry.value];
      let totalExchangeRate = (amount * exchangeRate).toFixed(5);
      showRate.innerHTML = `${amount} ${fromCountry.value} = ${totalExchangeRate} ${toCountry.value}`;
    })
    .catch(() => {
      showRate.innerHTML = "Something Went Wrong";
    });
}

getRateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});



swapBtn.onclick = () => {
  let first = fromCountry.value;
  fromCountry.value = toCountry.value;
  toCountry.value = first;
  changeFlag();
  getExchangeRate();
};

choosedCountry();