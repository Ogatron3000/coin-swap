import Decimal from "decimal.js";

const CustomDecimal = Decimal.set({ precision: 6, rounding: 4 })

export function convertCoin(amount, baseCoin, targetCoin) {
    if (amount == 0 || amount == '.') {
        return ''
    }
    let convertedAmount = CustomDecimal(amount).mul(CustomDecimal(baseCoin.current_price).div(targetCoin.current_price))
    return convertedAmount.toFixed()
}

export function getConversionRate(baseCoin, targetCoin) {
    return CustomDecimal(baseCoin.current_price).div(targetCoin.current_price).toNumber()
}

export function divideDecimal(a, b, decimals) {
    let val = CustomDecimal(a).div(b)
    if (decimals) {
        return val.toFixed(decimals)
    }
    return val.toFixed()
}

export function subtractDecimal(a, b, decimals) {
    let val = CustomDecimal(a).sub(b)
    if (decimals) {
        return val.toFixed(decimals)
    }
    return val.toFixed()
}
