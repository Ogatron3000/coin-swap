import Modal from "../Modal/Modal";
import styles from './Settings.module.css'

export default function SettingsModal({ isOpen, onClose, slippageTolerance, setCoinData }) {
    if (!isOpen) return null

    function handleChange(e) {
        const pattern = /^[0-9]*[.,]?[0-9]?$/
        let val = e.target.value
        if (pattern.test(val) && val < 50) {
            setCoinData(prevData => ({...prevData, slippageTolerance: val}))
        }
    }

    return (
        <Modal title="Settings" isOpen={isOpen} onClose={onClose}>
            <h3 className={styles.h3}>Slippage Tolerance</h3>
            <div className={styles.row}>
                <button
                    className={slippageTolerance == 0.1 ? `${styles.button} ${styles.buttonActive}` : styles.button}
                    onClick={() => setCoinData(prevData => ({...prevData, slippageTolerance: 0.1}))}
                >
                    0.1%
                </button>
                <button
                    className={slippageTolerance == 0.5 ? `${styles.button} ${styles.buttonActive}` : styles.button}
                    onClick={() => setCoinData(prevData => ({...prevData, slippageTolerance: 0.5}))}
                >
                    0.5%
                </button>
                <button
                    className={slippageTolerance == 1 ? `${styles.button} ${styles.buttonActive}` : styles.button}
                    onClick={() => setCoinData(prevData => ({...prevData, slippageTolerance: 1.0}))}
                >
                    1.0%
                </button>
                <div>
                    <input
                        value={slippageTolerance}
                        className={styles.input}
                        onChange={handleChange}
                        type="text"
                        inputMode='decimal'
                        title='Slippage Tolerance'
                        aria-label='Slippage Tolerance'
                    />
                    <span className={styles.percent}>%</span>
                </div>
            </div>
        </Modal>
    )
}
