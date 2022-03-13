import Spinner from "../Spinner/Spinner";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import convertToDateFormat from "../../helpers/convertToDateFormat";

export default function Chart({ isLoading, chartData, setPrice, setTime, priceDiff }) {
    if (isLoading) {
        return <Spinner />
    }

    function handleMouseMove({ activePayload }) {
        if (activePayload) {
            setPrice(activePayload[0].payload.price)
            setTime(convertToDateFormat(activePayload[0].payload.time))
        }
    }

    function handleMouseLeave() {
        setPrice(chartData[chartData.length - 1].price)
        setTime(chartData[chartData.length - 1].time)
    }

    return (
        <ResponsiveContainer>
            <AreaChart
                data={chartData}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={priceDiff > 0 ? 'var(--teal)' : 'var(--red)'} stopOpacity="0.34"/>
                        <stop offset="100%" stopColor={priceDiff > 0 ? 'var(--teal)' : 'var(--red)'} stopOpacity="0"/>
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
    )
}
