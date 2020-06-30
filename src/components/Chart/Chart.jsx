import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const data = [
        {
            Confirmed: confirmed?.value,
            Deaths: deaths?.value,
            Recovered: recovered?.value,
        },
    ];
    console.log(data);
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI();
    }, []);

    const lineChart = dailyData.length ? (
        <ResponsiveContainer aspect={3.0 / 2.0} width='100%'>
            <LineChart
                data={dailyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <Line type='monotone' dataKey='confirmed' stroke='#3333ff' />
                <Line
                    type='monotone'
                    dataKey='deaths'
                    stroke='rgba(255,0,0,0.5)'
                />
                <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    ) : // <Line
    //     data={{
    //         labels: dailyData.map(({ date }) => date),
    //         datasets: [
    //             {
    //                 data: dailyData.map(({ confirmed }) => confirmed),
    //                 label: 'Infected',
    //                 borderColor: '#3333ff',
    //                 fill: true,
    //             },
    //             {
    //                 data: dailyData.map(({ deaths }) => deaths),
    //                 label: 'Deaths',
    //                 borderColor: 'red',
    //                 backgroundColor: 'rgba(255,0,0,0.5)',
    //                 fill: true,
    //             },
    //         ],
    //     }}
    // />
    null;

    const barChart = confirmed ? (
        <ResponsiveContainer aspect={2.0 / 1.0} width='100%'>
            <BarChart data={data} barGap={'10%'}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='Confirmed' fill='#8884d8' />
                <Bar dataKey='Recovered' fill='#82ca9d' />
                <Bar dataKey='Deaths' fill='rgba(255, 0, 0, 0.5)' />
            </BarChart>
        </ResponsiveContainer>
    ) : // <Bar
    //     data={{
    //         labels: ['Infected', 'Recovered', 'Deaths'],
    //         datasets: [
    //             {
    //                 label: 'People',
    //                 backgroundColor: [
    //                     'rgba(0, 0, 255, 0.5)',
    //                     'rgba(0, 255, 0, 0.5)',
    //                     'rgba(255, 0, 0, 0.5)',
    //                 ],
    //                 data: [confirmed.value, recovered.value, deaths.value],
    //             },
    //         ],
    //     }}
    //     options={{
    //         legend: { display: false },
    //         title: { display: true, text: `Current state in ${country}` },
    //     }}
    // />
    null;

    return (
        <div className={styles.container}>{country ? barChart : lineChart}</div>
    );
};

export default Chart;
