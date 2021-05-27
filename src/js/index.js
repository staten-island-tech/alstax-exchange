let apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`;

const query = async function () {
  try {
    const response = await fetch(apiLink);
    const data = await response.json();
    console.log(data);

    let coinNumber = 0;
    data.forEach((coin) => {
        console.log(data[coinNumber]);
        coinNumber++;
    })
  } catch (error) {
    console.log(error);
  }
};
query();
