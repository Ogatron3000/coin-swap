import styles from './CoinsModal.module.css'
import {useContext, useState} from "react";
import {CoinsContext} from "../../context/CoinsProvider";
import Modal from "../Modal/Modal";

export default function CoinsModal({ isOpen, onClose, selectedCoinId }) {
    const [searchQuery, setSearchQuery] = useState('')

    const { coins, baseCoin, targetCoin, setCoinData } = useContext(CoinsContext)

    function changeCoin(newCoin) {
        if (selectedCoinId === baseCoin.id) {
            setCoinData(prevState => ({...prevState, baseCoin: newCoin}))
        } else {
            setCoinData(prevState => ({...prevState, targetCoin: newCoin}))
        }
    }

    if (!isOpen) return null

    return (
        <Modal title="Select a Coin" isOpen={isOpen} onClose={onClose}>
            <input
                className={styles.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                type="text"
                placeholder='Search name'
                autoFocus
            />
            <ul className={styles.ul}>
                {coins.map(coin => {
                    if (searchQuery.length > 0 &&
                        !coin.name.toLowerCase().includes(searchQuery) &&
                        !coin.symbol.toLowerCase().includes(searchQuery)
                    ) {
                        return null
                    }
                    return (
                        <li
                            className={styles.li}
                            key={coin.id}
                            style={[baseCoin.id, targetCoin.id].includes(coin.id) ? {opacity: 0.5, pointerEvents: 'none'} : null}
                            onClick={() => {
                                changeCoin(coin)
                                onClose()
                            }}
                        >
                            <img className={styles.logo} src={coin.image} alt={`${coin.name} logo`} />
                            <div className={styles.coinName}>
                                <span>{coin.symbol.toUpperCase()}</span>
                                <span>{coin.name}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.manageTokens}>Manage Tokens</div>
        </Modal>
    )
}
