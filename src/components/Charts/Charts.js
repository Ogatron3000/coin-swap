import styles from './Charts.module.css'
import {useContext, useEffect, useState} from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {CoinsContext} from "../../context/CoinsProvider";
import convertToDateFormat from "../../helpers/convertToDateFormat";
import {getRatios} from "../../services/coins";
import Spinner from "../Spinner/Spinner";
import {useQuery} from "react-query";

export default function Charts({ isOpen, onClose }) {
    const [days, setDays] = useState(7)
    const [price, setPrice] = useState(0)
    const [time, setTime] = useState('')
    const [swapped, setSwapped] = useState(false)
    const [ratios, setRatios] = useState([])
    const [chartData, setChartData] = useState([])

    const { baseCoin, targetCoin } = useContext(CoinsContext)

    let interval = days > 7 ? 'daily' : 'hourly'
    const {isLoading, data: ratiosArr} = useQuery(
        ['getRatios', baseCoin.id, targetCoin.id, days, interval],
        () => getRatios(baseCoin.id, targetCoin.id, days, interval),
        {refetchOnWindowFocus: false}
    )

    useEffect(() => {
        if (ratiosArr) {
            setPrice(!swapped ? ratiosArr[ratiosArr.length - 1].targetToBase : ratiosArr[ratiosArr.length - 1].baseToTarget)
            setTime(ratiosArr[ratiosArr.length - 1].date)
            setRatios(ratiosArr)
            // calculating chart data outside of state removes recharts animations
            setChartData(
                ratiosArr.map(ratio => {
                        let tick
                        if (days === 1) {
                            tick = new Date(ratio.date).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})
                        } else {
                            tick = new Date(ratio.date).toLocaleDateString('en-US', {day: '2-digit', month: 'short'})
                        }
                        return {
                            price: swapped ? ratio.baseToTarget : ratio.targetToBase,
                            time: ratio.date,
                            tick,
                        }
                })
            )
        }
    }, [ratiosArr])

    function swap() {
        setSwapped(!swapped)
        setChartData(chartData.map((data, i) => ({...data, price: !swapped ? ratios[i].baseToTarget : ratios[i].targetToBase})))
        setPrice(!swapped ? ratios[ratios.length - 1].baseToTarget : ratios[ratios.length - 1].targetToBase)
    }

    if (!isOpen) return null

    let base, target, priceDiff, priceDiffPercentage
    if (swapped) {
        base = targetCoin
        target = baseCoin
        priceDiff = (ratios[ratios.length - 1].baseToTarget - ratios[0].baseToTarget).toFixed(3)
        priceDiffPercentage = (ratios[ratios.length - 1].baseToTarget / ratios[0].baseToTarget).toFixed(2)
    } else {
        base = baseCoin
        target = targetCoin
        priceDiff = (ratios[ratios.length - 1].targetToBase - ratios[0].targetToBase).toFixed(3)
        priceDiffPercentage = (ratios[ratios.length - 1].targetToBase / ratios[0].targetToBase).toFixed(2)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.coins}>
                        <div className={styles.logos}>
                            <img className={styles.logo} src={base.image} alt={`${base.name} logo`} />
                            <img className={styles.logo} src={target.image} alt={`${target.name} logo`} />
                        </div>
                        <span className={styles.headerSymbols}>{base.symbol} / {target.symbol}</span>
                    </div>
                    <button onClick={swap}>
                        <svg viewBox="0 0 24 25" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.86 4.86003L21.65 7.65003C21.84 7.84003 21.84 8.16003 21.64 8.35003L18.85 11.14C18.54 11.46 18 11.24 18 10.79V9.00003H4C3.45 9.00003 3 8.55003 3 8.00003C3 7.45003 3.45 7.00003 4 7.00003H18V5.21003C18 4.76003 18.54 4.54003 18.86 4.86003ZM5.14001 19.14L2.35001 16.35C2.16001 16.16 2.16001 15.84 2.36001 15.65L5.15001 12.86C5.46001 12.54 6.00001 12.76 6.00001 13.21V15H20C20.55 15 21 15.45 21 16C21 16.55 20.55 17 20 17H6.00001V18.79C6.00001 19.24 5.46001 19.46 5.14001 19.14Z"/>
                        </svg>
                    </button>
                </div>
                <button onClick={onClose}>
                    <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"/>
                    </svg>
                </button>
            </div>
            <div className={styles.main}>
                {isLoading ?
                    <div className={styles.mainInfoPlaceholder} />
                    :
                    <div className={styles.mainInfo}>
                        <div className={styles.price}>{price < 0.001 ? '<' : null}{(Math.max(price, 0.001)).toFixed(3)}</div>
                        <div className={styles.mainSymbols}>{base.symbol} / {target.symbol} </div>
                        <div className={styles.percent} style={{color: priceDiff > 0 ? 'var(--teal)' : 'var(--red)'}}>
                            {priceDiff > 0 ? '+' : null}
                            {priceDiff < 0.001 ? '<' : null}
                            {Math.max(priceDiff, 0.001)} ({priceDiffPercentage}%)
                        </div>
                    </div>
                }
                <div className={styles.time}>
                    {time}
                </div>
                <div className={styles.tabs}>
                    <button onClick={() => setDays(1)} className={days === 1 ? styles.activeTab : null}>24H</button>
                    <button onClick={() => setDays(7)} className={days === 7 ? styles.activeTab : null}>1W</button>
                    <button onClick={() => setDays(30)} className={days === 30 ? styles.activeTab : null}>1M</button>
                    <button onClick={() => setDays(365)} className={days === 365 ? styles.activeTab : null}>1Y</button>
                </div>
            </div>
            <div className={styles.chart}>
                {isLoading ?
                    <Spinner />
                    :
                    <ResponsiveContainer>
                        <AreaChart
                            data={chartData}
                            onMouseMove={({activePayload}) => {
                                if (activePayload && activePayload[0].payload.price !== price) {
                                    setPrice(activePayload[0].payload.price.toFixed(3))
                                    setTime(convertToDateFormat(activePayload[0].payload.time))
                                }
                            }}
                            onMouseLeave={() => {
                                setPrice(!swapped ? ratios[ratios.length - 1].targetToBase : ratios[ratios.length - 1].baseToTarget)
                                setTime(ratios[ratios.length - 1].date)
                            }}
                        >
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={priceDiff > 0 ? 'var(--teal)' : 'var(--red)'}
                                          stopOpacity="0.34"/>
                                    <stop offset="100%" stopColor={priceDiff > 0 ? 'var(--teal)' : 'var(--red)'}
                                          stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                            <YAxis hide={true} domain={['dataMin', 'dataMax']}/>
                            <XAxis
                                dataKey="tick"
                                axisLine={false}
                                tickLine={false}
                                tickCount={7}
                                dy={6}
                                allowDataOverflow={false}
                            />
                            <Tooltip content={() => null}/>
                            <Area
                                type="linear"
                                dataKey="price"
                                stroke={priceDiff > 0 ? 'var(--teal)' : 'var(--red)'}
                                strokeWidth="2px"
                                fill="url(#gradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                }
            </div>
        </div>
    )
}
