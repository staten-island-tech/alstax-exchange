import { DOMSelectors } from "./DOM";
let data = [];
let filteredCoins = [];

DOMSelectors.searchBar.addEventListener("keyup", (e) => {
  const searchString = (e.target.value);
  filteredCoins = data.filter(coin => {
    return (
      coin.id.includes(searchString) || coin.symbol.includes(searchString) || coin.name.includes(searchString)
    );
  });
  console.log(filteredCoins);
  searchQuery();
});

const query = async function () {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250");
    data = await response.json();
    let coinNumber = 0;
    console.log(DOMSelectors.searchBar.value.length);
    data.every((coin) => {
        if (coinNumber >= 100) {
            return false;
        }
        const eachCoin = data[coinNumber];
        coinNumber++;

        const name = eachCoin.name;
        const symbol = eachCoin.symbol;
        const symbolUpper = symbol.toUpperCase();
        const price = eachCoin.current_price;
        const roundedPrice = Math.round((price + Number.EPSILON) * 1000) / 1000
        const coinImage = eachCoin.image;
        const coinChange24h = eachCoin.price_change_percentage_24h;
        const coinChange24hRounded = Math.round((coinChange24h + Number.EPSILON) * 100) / 100
        const coinChange24hDollars = eachCoin.price_change_24h;
        const coinChange24hDollarsAbs = Math.abs(coinChange24hDollars)
        const coinChange24hDollarsRounded = Math.round((coinChange24hDollarsAbs + Number.EPSILON) * 100) / 100
        const marketCap = eachCoin.market_cap.toLocaleString();
        const volume = eachCoin.total_volume.toLocaleString();
        const supply = eachCoin.circulating_supply.toLocaleString();

        if (coinChange24h < 0) {
            DOMSelectors.coinHTML.insertAdjacentHTML("beforeend", `
            <div class="bg-gray-600 text-left p-4">${coinNumber}</div>
            <div class="bg-gray-600 text-left p-4 font-semibold"><img class="max-h-4 m-0 pr-1 inline" src="${coinImage}" /> ${name} (${symbolUpper})</div>
            <div class="bg-gray-600 text-left p-4">$${roundedPrice}</div>
            <div class="text-red-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-down"></i> ${coinChange24hRounded}%</div>
            <div class="text-red-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-down"></i> -$${coinChange24hDollarsRounded}</div>
            <div class="bg-gray-600 text-left p-4">$${marketCap}</div>
            <div class="bg-gray-600 text-left p-4">$${volume}</div>
            <div class="bg-gray-600 text-left p-4">${supply} ${symbolUpper}</div>
        `);
        }
        if (coinChange24h > 0) {
            DOMSelectors.coinHTML.insertAdjacentHTML("beforeend", `
            <div class="bg-gray-600 text-left p-4">${coinNumber}</div>
            <div class="bg-gray-600 text-left p-4 font-semibold"><img class="max-h-4 m-0 pr-1 inline" src="${coinImage}" /> ${name} (${symbolUpper})</div>
            <div class="bg-gray-600 text-left p-4">$${price}</div>
            <div class="text-green-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-up"></i> ${coinChange24hRounded}%</div>
            <div class="text-green-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-up"></i> $${coinChange24hDollarsRounded}</div>
            <div class="bg-gray-600 text-left p-4">$${marketCap}</div>
            <div class="bg-gray-600 text-left p-4">$${volume}</div>
            <div class="bg-gray-600 text-left p-4">${supply} ${symbolUpper}</div>
        `);
        }
        
        return true;
    })
  } catch (error) {
    console.log(error);
  }
};

const searchQuery = async function () {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250");
    data = await response.json();
    let coinNumber = 0;
    console.log(DOMSelectors.searchBar.value.length);
    DOMSelectors.coinHTML.innerHTML = `
          <div class="bg-gray-700 text-left p-4">#</div>
          <div class="bg-gray-700 text-left p-4">Name</div>
          <div class="bg-gray-700 text-left p-4">Price</div>
          <div class="bg-gray-700 text-left p-4">24h Change (%)</div>
          <div class="bg-gray-700 text-left p-4">24h Change ($)</div>
          <div class="bg-gray-700 text-left p-4">Market Cap</div>
          <div class="bg-gray-700 text-left p-4">Volume (24h)</div>
          <div class="bg-gray-700 text-left p-4">Circulating Supply</div>
    `
    filteredCoins.every((coin) => {
        if (coinNumber >= 100) {
            return false;
        }
        const eachCoin = data[coinNumber];
        coinNumber++;

        const name = eachCoin.name;
        const symbol = eachCoin.symbol;
        const symbolUpper = symbol.toUpperCase();
        const price = eachCoin.current_price;
        const roundedPrice = Math.round((price + Number.EPSILON) * 1000) / 1000
        const coinImage = eachCoin.image;
        const coinChange24h = eachCoin.price_change_percentage_24h;
        const coinChange24hRounded = Math.round((coinChange24h + Number.EPSILON) * 100) / 100
        const coinChange24hDollars = eachCoin.price_change_24h;
        const coinChange24hDollarsAbs = Math.abs(coinChange24hDollars)
        const coinChange24hDollarsRounded = Math.round((coinChange24hDollarsAbs + Number.EPSILON) * 100) / 100
        const marketCap = eachCoin.market_cap.toLocaleString();
        const volume = eachCoin.total_volume.toLocaleString();
        const supply = eachCoin.circulating_supply.toLocaleString();

        if (coinChange24h < 0) {
            DOMSelectors.coinHTML.insertAdjacentHTML("beforeend", `
            <div class="bg-gray-600 text-left p-4">${coinNumber}</div>
            <div class="bg-gray-600 text-left p-4 font-semibold"><img class="max-h-4 m-0 pr-1 inline" src="${coinImage}" /> ${name} (${symbolUpper})</div>
            <div class="bg-gray-600 text-left p-4">$${roundedPrice}</div>
            <div class="text-red-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-down"></i> ${coinChange24hRounded}%</div>
            <div class="text-red-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-down"></i> -$${coinChange24hDollarsRounded}</div>
            <div class="bg-gray-600 text-left p-4">$${marketCap}</div>
            <div class="bg-gray-600 text-left p-4">$${volume}</div>
            <div class="bg-gray-600 text-left p-4">${supply} ${symbolUpper}</div>
        `);
        }
        if (coinChange24h > 0) {
            DOMSelectors.coinHTML.insertAdjacentHTML("beforeend", `
            <div class="bg-gray-600 text-left p-4">${coinNumber}</div>
            <div class="bg-gray-600 text-left p-4 font-semibold"><img class="max-h-4 m-0 pr-1 inline" src="${coinImage}" /> ${name} (${symbolUpper})</div>
            <div class="bg-gray-600 text-left p-4">$${price}</div>
            <div class="text-green-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-up"></i> ${coinChange24hRounded}%</div>
            <div class="text-green-600 bg-gray-600 text-left p-4"><i class="fas fa-chevron-up"></i> $${coinChange24hDollarsRounded}</div>
            <div class="bg-gray-600 text-left p-4">$${marketCap}</div>
            <div class="bg-gray-600 text-left p-4">$${volume}</div>
            <div class="bg-gray-600 text-left p-4">${supply} ${symbolUpper}</div>
        `);
        }
        
        return true;
    })
  } catch (error) {
    console.log(error);
  }
};

query();



/* searchInput.addEventListener("onkeyup", event => {
    myFunction();
}); */

