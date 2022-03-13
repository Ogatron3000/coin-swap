import styles from './CoinInput.module.css'
import {useState} from "react";
import CoinsModal from "../CoinsModal/CoinsModal";
import CopyButton from "../CopyButton/CopyButton";

export default function CoinInput({ coin, amount, handleChange }) {
    const [open, setOpen] = useState(false)

    if (!coin) return null

    return (
        <div>
            <CoinsModal
                selectedCoinId={coin.id}
                isOpen={open}
                onClose={() => setOpen(false)}
            />
            <div className={styles.buttons}>
                <button className={styles.tokenButton} onClick={() => setOpen(true)}>
                    <img className={styles.logo} src={coin.image} alt={`${coin.name} logo`} />
                    <span>{coin.symbol.toUpperCase()}</span>
                    <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"/>
                    </svg>
                </button>
                <CopyButton coinName={coin.name} />
            </div>
            <input className={styles.input}
                   onChange={handleChange}
                   value={amount}
                   type="text"
                   inputMode='decimal'
                   title='Token Amount'
                   aria-label='Token Amount'
                   placeholder='0.0'/>
        </div>
    )
}
