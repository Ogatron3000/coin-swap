import styles from './App.module.css';
import Exchange from "./components/Exchange/Exchange";

function App() {
    return (
        <div className={styles.wrapper}>
            <h1>CoinSwap</h1>
            <Exchange/>
        </div>
    );
}

export default App;
