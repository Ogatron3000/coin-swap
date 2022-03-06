export function convert(amount, baseCoin, targetCoin) {
    if (amount == 0 || amount == '.') {
        return ''
    }
    let convertedAmount = parseFloat((amount * baseCoin.current_price / targetCoin.current_price).toFixed(8))
    convertedAmount = Math.max(convertedAmount, 0.000001)
    return Math.min(convertedAmount, targetCoin.total_volume)
}
