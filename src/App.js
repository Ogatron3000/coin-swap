import styles from './App.module.css';
import CoinsProvider from "./context/CoinsProvider";
import {QueryClient, QueryClientProvider} from "react-query";
import ChartWindow from "./components/ChartWindow/ChartWindow";
import ExchangeWindow from "./components/ExchangeWindow/ExchangeWindow";
import {useState} from "react";

const queryClient = new QueryClient()

function App() {
    const [isChartWindowOpen, setIsChartWindowOpen] = useState(false)

    function toggleChartWindow() {
        setIsChartWindowOpen(!isChartWindowOpen)
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.h1}>CoinSwap</h1>
            <QueryClientProvider client={queryClient}>
                <CoinsProvider>
                    <div className={styles.main}>
                        <ChartWindow isChartWindowOpen={isChartWindowOpen} toggleChartWindow={toggleChartWindow} />
                        <ExchangeWindow isChartWindowOpen={isChartWindowOpen} toggleChartWindow={toggleChartWindow} />
                    </div>
                </CoinsProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
