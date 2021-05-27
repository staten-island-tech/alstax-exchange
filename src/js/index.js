let apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`;

const query = async function () {
  try {
    const response = await fetch(apiLink);
    const data = await response.json();
    console.log(data);

    let coinNumber = 0;
    data.forEach((coin) => {
        const eachCoin = data[coinNumber];
        coinNumber++;

        const name = eachCoin.name;
        const symbol = eachCoin.symbol;
        const symbolUpper = symbol.toUpperCase();
        const price = eachCoin.current_price;
        const coinImage = eachCoin.image.large;
        const coinChange24h = eachCoin.price_change_percentage_24h;
        const coinChange7d = eachCoin.price_change_percentage_7d;
        const marketCap = eachCoin.market_cap;
        const volume = eachCoin.total_volume;
        const supply = eachCoin.total_supply;

        const coinHTML = document.getElementById("coin-table");
        coinHTML.insertAdjacentHTML("beforeend", `
            <div class="bg-gray-600 text-left p-4">${coinNumber}</div>
            <div class="bg-gray-600 text-left p-4">${name} - ${symbolUpper}</div>
            <div class="bg-gray-600 text-left p-4">$${price}</div>
            <div class="bg-gray-600 text-left p-4">${coinChange24h}</div>
            <div class="bg-gray-600 text-left p-4">${coinChange7d}</div>
            <div class="bg-gray-600 text-left p-4">${marketCap}</div>
            <div class="bg-gray-600 text-left p-4">${volume}</div>
            <div class="bg-gray-600 text-left p-4">${supply}</div>
        `);
    })
  } catch (error) {
    console.log(error);
  }
};
query();
