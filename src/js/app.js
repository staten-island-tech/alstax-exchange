let apiLink = `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;
document.getElementById("search-button").addEventListener("click", search);

function search() {
  const userSearch = document.getElementById("input").value;
  apiLink = `https://api.coingecko.com/api/v3/coins/${userSearch}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;
  query();
}

const query = async function () {
  try {
    const response = await fetch(apiLink);
    const data = await response.json();
    console.log(data);
    const coinName = data.name;
    const coinTicker = data.symbol;
    const coinTickerUp = coinTicker.toUpperCase();
    const coinPrice = data.market_data.current_price.usd;
    const coinImage = data.image.large;
    const coinChange24h = data.market_data.price_change_percentage_24h;
    const coinChange7d = data.market_data.price_change_percentage_7d;

    document.getElementById("image").src = `${coinImage}`;
    document.getElementById("name").innerText = `Name: ${coinName}`;
    document.getElementById("ticker").innerText = `Ticker: ${coinTickerUp}`;
    document.getElementById("price").innerText = `Current Price: $${coinPrice}`;
    document.getElementById(
      "daily"
    ).innerText = `24hrs % Change: ${coinChange24h}%`;
    document.getElementById(
      "weekly"
    ).innerText = `7d % Change: ${coinChange7d}%`;
  } catch (error) {
    console.log(error);
  }
};
query();
