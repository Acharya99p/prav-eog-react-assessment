import React from "react";
import { Card, makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: '20px'
  },
  title: {
    margin: 0
  },
  value: {
    margin: 0,
    fontSize: 40,
    fontFamily: 'Roboto'
  }
});

interface IMetricCard {
  title: string;
  value: string | number;
};

const MetricCard: React.SFC<IMetricCard> = ({ title = '', value = '' }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <h4 className={classes.title}>{title}</h4>
      <h4 className={classes.value}>{
        value === ''
          ? <CircularProgress />
          : value
      }</h4>
    </Card>
  );
};

export default MetricCard;