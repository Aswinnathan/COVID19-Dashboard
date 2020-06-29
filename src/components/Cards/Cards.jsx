import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (!confirmed) {
        return 'Loading...';
    }

    const fetchedData = [
        {
            type: 'Infected',
            count: confirmed.value,
            text: 'Number of active cases of COVID-19',
            updated: lastUpdate,
        },
        {
            type: 'Recovered',
            count: recovered.value,
            text: 'Number of recoveries from COVID-19',
            updated: lastUpdate,
        },
        {
            type: 'Deaths',
            count: deaths.value,
            text: 'Number of deaths caused by COVID-19',
            updated: lastUpdate,
        },
    ];

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                {fetchedData.map(({ type, count, text, updated }, i) => (
                    <Grid
                        key={i}
                        item
                        component={Card}
                        xs={12}
                        md={3}
                        className={cx(styles.card, {
                            [styles.infected]: type === 'Infected',
                            [styles.recovered]: type === 'Recovered',
                            [styles.deaths]: type === 'Deaths',
                        })}>
                        <CardContent>
                            <Typography color='textSecondary' gutterBottom>
                                {type}
                            </Typography>
                            <Typography variant='h5'>
                                <CountUp
                                    start={0}
                                    end={count}
                                    duration={2.5}
                                    separator=','
                                />
                            </Typography>
                            <Typography color='textSecondary'>
                                {new Date(`${updated}`).toDateString()}
                            </Typography>
                            <Typography variant='body2'>{text}</Typography>
                        </CardContent>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Cards;
