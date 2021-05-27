let apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250`;

const query = async function () {
  try {
    const response = await fetch(apiLink);
    const data = await response.json();
    console.log(data);

    let coinNumber = 0;
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
        const coinImage = eachCoin.image;
        const coinChange24h = eachCoin.price_change_percentage_24h;
        const coinChange24hDollars = eachCoin.price_change_24h;
        const marketCap = eachCoin.market_cap;
        const volume = eachCoin.total_volume;
        const supply = eachCoin.circulating_supply;

        const coinHTML = document.getElementById("coin-table");
        coinHTML.insertAdjacentHTML("beforeend", `
            <div class="bg-gray-600 text-left p-4">${coinNumber}</div>
            <div class="bg-gray-600 text-left p-4 font-semibold"><img class="max-h-4 m-0 pr-1 inline" src="${coinImage}" /> ${name} (${symbolUpper})</div>
            <div class="bg-gray-600 text-left p-4">$${price}</div>
            <div class="bg-gray-600 text-left p-4">${coinChange24h}%</div>
            <div class="bg-gray-600 text-left p-4">$${coinChange24hDollars}</div>
            <div class="bg-gray-600 text-left p-4">$${marketCap}</div>
            <div class="bg-gray-600 text-left p-4">$${volume}</div>
            <div class="bg-gray-600 text-left p-4">${supply} ${symbolUpper}</div>
        `);
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

