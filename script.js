const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdown) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");

    newoption.innerText = currcode;
    newoption.value = currcode.toLowerCase();

    // Default selections
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = true;
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = true;
    }

    select.append(newoption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

window.addEventListener("load",() =>{
    updateexchangerate();
      const selects = document.querySelectorAll(".dropdown select");

    selects.forEach((select) => {
        updateflag(select);
    })
})

// Update flag
const updateflag = (element) => {
  let currcode = element.value.toUpperCase();
  let countrycode = countryList[currcode];

  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};


// Currency conversion
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateexchangerate();


});
const updateexchangerate = async () => {
  let amount = document.querySelector("input");
  let amtval = amount.value;

  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = 1;
  }

  const URL = `${BASE_URL}/${fromcurr.value}.json`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromcurr.value][tocurr.value];

    let finalrate = amtval * rate;

    msg.innerText = `${amtval} ${fromcurr.value.toUpperCase()} = ${finalrate.toFixed(2)} ${tocurr.value.toUpperCase()}`;
  } catch (error) {
    msg.innerText = "Something went wrong!";
    console.log(error);
  }
};