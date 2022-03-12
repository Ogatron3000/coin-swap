import styles from "./ChartMainInfo.module.css";

export default function ChartMainInfo({ isLoading, price, base, target, priceDiff, priceDiffPercentage }) {
    if (isLoading) {
        return <div className={styles.mainInfoPlaceholder} />
    }

    return (
        <div className={styles.mainInfo}>
            <div className={styles.price}>
                {price < 0.001 ? '<' : null}{(Math.max(price, 0.001)).toFixed(3)}
            </div>
            <div className={styles.mainSymbols}>
                {base.symbol} / {target.symbol}
            </div>
            <div className={styles.percent} style={{color: priceDiff > 0 ? 'var(--teal)' : 'var(--red)'}}>
                {priceDiff > 0 ? '+' : null}
                {priceDiff < 0.001 ? '<' : null}
                {Math.max(priceDiff, 0.001)} ({priceDiffPercentage}%)
            </div>
        </div>
    )
}