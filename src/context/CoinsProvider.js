import {createContext, useEffect, useState} from "react";
import {getCoins} from "../services/coins";

export const CoinsContext = createContext()

export default function CoinsProvider({ children }) {
    const [coinData, setCoinData] = useState({
        coins: [],
        baseCoin: null,
        targetCoin: null,
        baseAmount: '',
        targetAmount: '',
        amountInBaseCoin: true,
    })

    useEffect(() => {
        getCoins()
            .then(data => {
                setCoinData(prevState => ({...prevState, ...data}))
            })
    }, [])

    return(
        <CoinsContext.Provider value={{...coinData, setCoinData}}>
            {children}
        </CoinsContext.Provider>
    )
}
