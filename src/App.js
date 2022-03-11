import styles from './App.module.css';
import Exchange from "./components/Exchange/Exchange";
import CoinsProvider from "./context/CoinsProvider";

function App() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h1}>CoinSwap</h1>
            <CoinsProvider>
                <div className={styles.exchange}>
                    <Exchange/>
                </div>
            </CoinsProvider>
        </div>
    );
}

export default App;
