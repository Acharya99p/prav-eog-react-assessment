import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { useQuery } from 'urql';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Grid, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import { getFilters } from './selectors';

const query = `{
  getMetrics
}`;

const Filters = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({ query });
  const classes = useStyles();
  const { metrics } = useSelector(getFilters);
  const { fetching, data, error } = result;
  
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricsDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  return (
    <Grid container spacing={2} className={classes.filters}>
      <Grid item xs={4}>
        {
          fetching
            ? <CircularProgress />
            : <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={metrics.map(m => m.title)}
              getOptionLabel={(option: any) => option}
              renderInput={(params: any) => (
                <TextField {...params} variant="outlined" label="Metrics Filter" placeholder="Select..." />
              )}
              onChange={(event, values) => dispatch(actions.metricSelected(values))}
            />
        }
      </Grid>
    </Grid>
  );
}

export default Filters;
