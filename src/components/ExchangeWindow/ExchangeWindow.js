import styles from "./ExchangeWindow.module.css";
import CoinInput from "../CoinInput/CoinInput";
import SwapButton from "../SwapButton/SwapButton";
import Price from "../Price/Price";
import {useContext, useState} from "react";
import {CoinsContext} from "../../context/CoinsProvider";
import Spinner from "../Spinner/Spinner";
import SettingsModal from "../SettingsModal/SettingsModal";

export default function ExchangeWindow({ isChartWindowOpen, toggleChartWindow }) {
    const [settingsOpen, setSettingsOpen] = useState(false)

    const { baseCoin, targetCoin, baseAmount, targetAmount, slippageTolerance, setCoinData } = useContext(CoinsContext)

    function onInput(e, amountInBaseCoin) {
        const pattern = /^[0-9]*[.,]?[0-9]*$/
        const amount = e.target.value
        if (pattern.test(amount)) {
            setCoinData(prevState => ({...prevState, amount, amountInBaseCoin}))
        }
    }

    if (!baseCoin) return <Spinner />

    return (
        <div className={styles.wrapper}>
            <div className={styles.exchange}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <button className={styles.button} onClick={toggleChartWindow}>
                            {isChartWindowOpen ?
                                <svg viewBox="0 0 23 22" color="textSubtle" width="20px" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                    <path d="M21.5 1l-20 20" strokeWidth="2" stroke="currentColor" strokeLinecap="round"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.033 19H19.5a1 1 0 100-2H9.033l-2 2zm3-3H18.5a1 1 0 001-1V6.533l-2 2V14h-2v-3.467l-2 2V14h-1.467l-2 2zm.936-8H10.5a1 1 0 00-1 1v.469L10.969 8zm-2 2L5.5 13.469V11a1 1 0 011-1h2.469zM4.5 14.469l-2 2V6a1 1 0 012 0v8.469z"/>
                                </svg>
                                :
                                <svg viewBox="0 0 24 24" width="24px" color="textSubtle" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                    <path d="M5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7V18C3 19.1046 3.89543 20 5 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V7Z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M19 17H7C6.44772 17 6 16.5523 6 16V12C6 11.4477 6.44772 11 7 11H10V10C10 9.44772 10.4477 9 11 9H14V7C14 6.44772 14.4477 6 15 6H19C19.5523 6 20 6.44772 20 7V16C20 16.5523 19.5523 17 19 17ZM16 8H18V15H16V8ZM12 15H14V11H12V15ZM10 13H8V15H10V13Z"/>
                                </svg>
                            }
                        </button>
                        <h2 className={styles.h2}>Swap</h2>
                        <>
                            <button className={styles.button} onClick={() => setSettingsOpen(true)}>
                                <svg viewBox="0 0 24 24" height="24" width="24" color="textSubtle" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                    <path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"/>
                                </svg>
                            </button>
                            <SettingsModal
                                isOpen={settingsOpen}
                                onClose={() => setSettingsOpen(false)}
                                slippageTolerance={slippageTolerance}
                                setCoinData={setCoinData}
                            />
                        </>
                    </div>
                    <div className={styles.description}>
                        Trade tokens in an instant
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.row}>
                        <CoinInput
                            coin={baseCoin}
                            amount={baseAmount}
                            handleChange={(e) => onInput(e, true)}
                        />
                    </div>
                    <div className={styles.row}>
                        <SwapButton />
                    </div>
                    <div className={styles.row}>
                        <CoinInput
                            coin={targetCoin}
                            amount={targetAmount}
                            handleChange={(e) => onInput(e, false)}
                        />
                    </div>
                    <div className={styles.info}>
                        {baseAmount > 0 && <Price />}
                        <div className={styles.tolerance}>
                            <span>Slippage Tolerance</span>
                            <span>
                                {slippageTolerance == '' || slippageTolerance == '.' ? 0 : parseFloat(slippageTolerance).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
