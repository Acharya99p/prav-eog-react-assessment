import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubscription } from "urql";
import { getSelectedMetrics } from "./selectors";
import { actions } from "./reducer";

const query = `subscription {
  newMeasurement{
    metric,
    at,
    value,
    unit
  }
}`;

const Subscription = () => {
  const selectedMetrics = useSelector(getSelectedMetrics);
  const [res] = useSubscription({ query });
  const measurement = res.data;
  const dispatch = useDispatch();
  useEffect(() => {
    if (measurement && measurement.newMeasurement && selectedMetrics.includes(measurement.newMeasurement.metric)) {
      dispatch(actions.measurementRecevied(measurement.newMeasurement));
    }
  }, [measurement]);

  return null;
}

export default Subscription;
