import styles from './Price.module.css'
import {useContext, useState} from "react";
import {CoinsContext} from "../../context/CoinsProvider";
import {divideDecimal} from "../../helpers/coinConversion";

export default function Price() {
    const [priceOrderSwapped, setPriceOrderSwapped] = useState(false)

    const { baseCoin, targetCoin } = useContext(CoinsContext)

    let price
    if (!priceOrderSwapped) {
         price =
            <span>
                {divideDecimal(targetCoin.current_price, baseCoin.current_price)} {baseCoin.symbol.toUpperCase()} per {targetCoin.symbol.toUpperCase()}
            </span>
    } else {
        price =
            <span>
                {divideDecimal(baseCoin.current_price, targetCoin.current_price)} {targetCoin.symbol.toUpperCase()} per {baseCoin.symbol.toUpperCase()}
            </span>
    }

    return (
        <div className={styles.price}>
            <span>Price</span>
            <div>
                {price}
                <button onClick={() => setPriceOrderSwapped(!priceOrderSwapped)}>
                    <svg viewBox="0 0 24 24" width="14px" color="text" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V7.79C12 8.24 12.54 8.46 12.85 8.14L15.64 5.35C15.84 5.15 15.84 4.84 15.64 4.64L12.85 1.85C12.54 1.54 12 1.76 12 2.21V4C7.58 4 4 7.58 4 12C4 13.04 4.2 14.04 4.57 14.95C4.84 15.62 5.7 15.8 6.21 15.29C6.48 15.02 6.59 14.61 6.44 14.25C6.15 13.56 6 12.79 6 12C6 8.69 8.69 6 12 6ZM17.79 8.71C17.52 8.98 17.41 9.4 17.56 9.75C17.84 10.45 18 11.21 18 12C18 15.31 15.31 18 12 18V16.21C12 15.76 11.46 15.54 11.15 15.86L8.36 18.65C8.16 18.85 8.16 19.16 8.36 19.36L11.15 22.15C11.46 22.46 12 22.24 12 21.8V20C16.42 20 20 16.42 20 12C20 10.96 19.8 9.96 19.43 9.05C19.16 8.38 18.3 8.2 17.79 8.71Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
