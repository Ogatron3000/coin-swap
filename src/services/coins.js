import convertToDateFormat from "../helpers/convertToDateFormat";
import {CustomDecimal, divideDecimal, getConversionRate} from "../helpers/coinConversion";

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/'
const MARKETS_URL = `${BASE_URL}markets?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y`

export function getCoins() {
    return fetch(MARKETS_URL)
        .then(res => res.json())
        .then(coins => {
            return {
                coins,
                baseCoin: coins[0],
                targetCoin: coins[1]
            }
        })
}

function getCoinPriceHistory(coinId, days, interval) {
    return fetch(`${BASE_URL}${coinId}/market_chart?vs_currency=btc&days=${days}&interval=${interval}`)
        .then(res => res.json())
        .then(history => history.prices.map(([date, price]) => {
            return {
                price,
                date: convertToDateFormat(date)
            }
        }))
}

export async function getRatios(baseCoin, targetCoin, days, interval) {
    const baseCoinHistory = await getCoinPriceHistory(baseCoin.id, days, interval)
    const targetCoinHistory = await getCoinPriceHistory(targetCoin.id, days, interval)
    let ratios = targetCoinHistory
        .slice(0, baseCoinHistory.length) // API can return diff length arrays for diff coins
        .map(({date, price}, i) => {
            return {
                baseToTarget: divideDecimal(price, baseCoinHistory[i].price),
                targetToBase: divideDecimal(baseCoinHistory[i].price, price),
                date,
            }
        })
    if (days === 7) {
        ratios = ratios.filter((_, i) => i % 6 === 0 || i === ratios.length - 1)
    } else if (days === 365) {
        ratios = ratios.filter((_, i) => i % 15 === 0 || i === ratios.length - 1)
    }
    ratios[ratios.length - 1].baseToTarget = divideDecimal(targetCoin.current_price, baseCoin.current_price)
    ratios[ratios.length - 1].targetToBase = divideDecimal(baseCoin.current_price, targetCoin.current_price)
    ratios[ratios.length - 1].date = convertToDateFormat(Date.now())
    return ratios
}
