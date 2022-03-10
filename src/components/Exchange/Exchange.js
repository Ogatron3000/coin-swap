import styles from './Exchange.module.css'
import TokenInput from "../CoinInput/TokenInput";
import SwapButton from "../SwapButton/SwapButton";
import {useContext, useState} from "react";
import Price from "../Price/Price";
import {CoinsContext} from "../../context/CoinsProvider";
import {convert} from "../../helpers/convert";
import Charts from "../Charts/Charts";

export default function Exchange() {
    const [isChartOpen, setIsChartOpen] = useState(false)

    const { baseCoin, targetCoin, baseAmount, targetAmount, setCoinData } = useContext(CoinsContext)

    function onInput(e, amountsCalculator) {
        const pattern = /^[0-9]*[.,]?[0-9]*$/
        const amount = e.target.value
        if (pattern.test(amount)) {
            const {baseAmount, targetAmount, amountInBaseCoin} = amountsCalculator(amount)
            setCoinData(prevState => ({...prevState, baseAmount, targetAmount, amountInBaseCoin}))
        }
    }

    function handleBaseAmountChange(amount) {
        let baseAmount = amount
        let targetAmount = convert(amount, baseCoin, targetCoin)
        return {baseAmount, targetAmount, amountInBaseCoin: true}
    }

    function handleTargetAmountChange(amount) {
        let baseAmount = convert(amount, targetCoin, baseCoin)
        let targetAmount = amount
        return {baseAmount, targetAmount, amountInBaseCoin: false}
    }

    function swap() {
        setCoinData(prevState => ({...prevState,
            baseCoin: prevState.targetCoin,
            targetCoin: prevState.baseCoin,
            baseAmount: prevState.targetAmount,
            targetAmount: prevState.baseAmount,
            amountInBaseCoin: !prevState.amountInBaseCoin,
        }))
    }

    if (!baseCoin) return null

    return (
        <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'row-reverse'}}>

            <div className={styles.wrapper}>
                <div className={styles.exchange}>
                    <div className={styles.header}>
                        <div className={styles.headerTop}>
                            <button className={styles.button} onClick={() => setIsChartOpen(!isChartOpen)}>
                                {isChartOpen ?
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
                            <div className={styles.buttonsRight}>
                                <button className={styles.button}>
                                    <svg viewBox="0 0 24 24" height="24" width="24" color="textSubtle" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                        <path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z"/>
                                    </svg>
                                </button>
                                <button className={styles.button}>
                                    <svg viewBox="0 0 24 24" color="textSubtle" width="24px" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                        <path d="M13 3C8.03 3 4 7.03 4 12H2.20711C1.76165 12 1.53857 12.5386 1.85355 12.8536L4.54604 15.546C4.73751 15.7375 5.04662 15.7418 5.24329 15.5556L8.08805 12.8631C8.4164 12.5524 8.19646 12 7.74435 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.4314 19 9.98175 18.4782 8.81739 17.601C8.37411 17.267 7.74104 17.259 7.3486 17.6514C6.95725 18.0428 6.95413 18.6823 7.38598 19.0284C8.92448 20.2615 10.8708 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z"/>
                                    </svg>
                                </button>
                                <button className={styles.button}>
                                    <svg viewBox="0 0 24 24" color="textSubtle" width="24px" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                        <path d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles.description}>
                            Trade tokens in an instant
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.row}>
                            <TokenInput
                                coin={baseCoin}
                                amount={baseAmount}
                                handleChange={(e) => onInput(e, handleBaseAmountChange)}
                            />
                        </div>
                        <div className={styles.row}>
                            <SwapButton handleClick={swap} />
                        </div>
                        <div className={styles.row}>
                            <TokenInput
                                coin={targetCoin}
                                amount={targetAmount}
                                handleChange={(e) => onInput(e, handleTargetAmountChange)}
                            />
                        </div>
                        <div className={styles.info}>
                            {baseAmount > 0 && <Price />}
                            <div className={styles.tolerance}>
                                <span>Shipping Tolerance</span>
                                <span>0.5%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Charts isOpen={isChartOpen} onClose={() => setIsChartOpen(!isChartOpen)} />
        </div>
    )
}
