import {createContext, useEffect, useState} from "react";
import {getCoins} from "../services/coins";
import {convert} from "../helpers/convert";

export const CoinsContext = createContext()

export default function CoinsProvider({ children }) {
    const [coinData, setCoinData] = useState({
        coins: [],
        baseCoin: null,
        targetCoin: null,
        amount: '',
        amountInBaseCoin: true,
    })

    useEffect(() => {
        getCoins()
            .then(data => {
                setCoinData(prevState => ({...prevState, ...data}))
            })
    }, [])

    const {amount, amountInBaseCoin, baseCoin, targetCoin} = coinData
    let baseAmount, targetAmount
    if (amountInBaseCoin) {
        baseAmount = amount
        targetAmount = convert(amount, baseCoin, targetCoin)
    } else {
        baseAmount = convert(amount, targetCoin, baseCoin)
        targetAmount = amount
    }

    return(
        <CoinsContext.Provider value={{...coinData, setCoinData, baseAmount, targetAmount}}>
            {children}
        </CoinsContext.Provider>
    )
}
