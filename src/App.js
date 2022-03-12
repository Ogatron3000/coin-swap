import styles from './App.module.css';
import Exchange from "./components/Exchange/Exchange";
import CoinsProvider from "./context/CoinsProvider";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h1}>CoinSwap</h1>
            <QueryClientProvider client={queryClient}>
                <CoinsProvider>
                    <div className={styles.exchange}>
                        <Exchange/>
                    </div>
                </CoinsProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
