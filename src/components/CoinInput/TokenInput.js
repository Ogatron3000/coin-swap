import styles from './TokenInput.module.css'

export default function TokenInput({ coin, tokenAmount, handleChange }) {
    if (!coin) return null
    return (
        <div>
            <div className={styles.buttons}>
                <button className={styles.tokenButton}>
                    <img className={styles.logo} src={coin.image} alt={`${coin.name} logo`} />
                    <span>{coin.symbol.toUpperCase()}</span>
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
                   id={coin.current_price === 1 ? 'base_coin' : 'target_coin'}
                   type="text"
                   inputMode='decimal'
                   title='Token Amount'
                   aria-label='Token Amount'
                   placeholder='0.0'/>
        </div>
    )
}
