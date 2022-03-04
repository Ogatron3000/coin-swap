import styles from './TokenInput.module.css'
import {useState} from "react";

export default function TokenInput() {
    const [tokenAmount, setTokenAmount] = useState('')

    function handleChange(e) {
        const pattern = /^[0-9]*[.,]?[0-9]*$/
        if (pattern.test(e.target.value)) {
            setTokenAmount(e.target.value)
        }
    }

    return (
        <div>
            <div className={styles.buttons}>
                <button className={styles.tokenButton}>
                    <svg viewBox="0 0 16 16" width="24px" color="text" xmlns="http://www.w3.org/2000/svg"
                         style={{marginRight: '8px'}}>
                        <circle cx="8" cy="8" r="8" fill="#F0B90B"/>
                        <path d="M5.01656 8.00006L3.79256 9.23256L2.56006 8.00006L3.79256 6.76756L5.01656 8.00006ZM8.00006 5.01656L10.1081 7.12456L11.3406 5.89206L9.23256 3.79256L8.00006 2.56006L6.76756 3.79256L4.66806 5.89206L5.90056 7.12456L8.00006 5.01656ZM12.2076 6.76756L10.9836 8.00006L12.2161 9.23256L13.4401 8.00006L12.2076 6.76756ZM8.00006 10.9836L5.89206 8.87556L4.66806 10.1081L6.77606 12.2161L8.00006 13.4401L9.23256 12.2076L11.3406 10.0996L10.1081 8.87556L8.00006 10.9836ZM8.00006 9.23256L9.23256 8.00006L8.00006 6.76756L6.76756 8.00006L8.00006 9.23256Z"
                              fill="#FFFDFA"/>
                    </svg>
                    <span>BNB</span>
                    <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"/>
                    </svg>
                </button>
                <button className={styles.copyButton}>
                    <svg viewBox="0 0 24 24" color="textSubtle" width="16px" xmlns="http://www.w3.org/2000/svg" fill='currentColor'>
                        <path d="M15 1H4C2.9 1 2 1.9 2 3V16C2 16.55 2.45 17 3 17C3.55 17 4 16.55 4 16V4C4 3.45 4.45 3 5 3H15C15.55 3 16 2.55 16 2C16 1.45 15.55 1 15 1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM18 21H9C8.45 21 8 20.55 8 20V8C8 7.45 8.45 7 9 7H18C18.55 7 19 7.45 19 8V20C19 20.55 18.55 21 18 21Z"/>
                    </svg>
                </button>
            </div>
            <input className={styles.input}
                   onChange={handleChange}
                   value={tokenAmount}
                   type="text"
                   inputMode='decimal'
                   title='Token Amount'
                   aria-label='Token Amount'
                   placeholder='0.0'/>
        </div>
    )
}
