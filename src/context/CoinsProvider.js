import {createContext, useEffect, useState} from "react";
import {getCoins} from "../services/coins";
import {convertCoin} from "../helpers/coinConversion";

export const CoinsContext = createContext()

export default function CoinsProvider({ children }) {
    const [coinData, setCoinData] = useState({
        coins: [],
        baseCoin: null,
        targetCoin: null,
        amount: '',
        amountInBaseCoin: true,
        slippageTolerance: '0.5',
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
        targetAmount = convertCoin(amount, baseCoin, targetCoin)
    } else {
        baseAmount = convertCoin(amount, targetCoin, baseCoin)
        targetAmount = amount
    }

    return(
        <CoinsContext.Provider value={{...coinData, setCoinData, baseAmount, targetAmount}}>
            {children}
        </CoinsContext.Provider>
    )
}
