//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
var func = async () => {
  let data = await CoinGeckoClient.ping();
};

let test = await CoinGeckoClient.coins.all();

console.log(test);
