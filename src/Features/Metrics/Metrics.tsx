import React from 'react';
import { Grid } from '@material-ui/core';
import MetricCard from '../../components/MetricCard';
import { useSelector } from 'react-redux';
import { getSelectedMetrics, getLatestMeasurements } from './selectors';

const Metrics = () => {
  const metrics = useSelector(getSelectedMetrics);
  const measurements = useSelector(getLatestMeasurements);

  return (
    metrics && metrics.length
      ? (
        <Grid container spacing={2}>
          {
            metrics.map((m, i) => (
              <Grid key={i} item xs={3}>
                <MetricCard title={m.title} value={measurements[m.title]} />
              </Grid>
            ))
          }
        </Grid>
      )
      : null
  )
}

export default Metrics;
