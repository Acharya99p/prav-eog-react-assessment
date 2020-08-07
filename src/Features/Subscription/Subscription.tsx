import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubscription } from "urql";
import { getSelectedMetrics, getAllMetrics } from "./selectors";
import { actions } from "./reducer";
import { Measurement } from "../../types";

const query = `subscription {
  newMeasurement{
    metric,
    at,
    value,
    unit
  }
}`;

let dataCache: Measurement[] = [];

const Subscription = () => {
  const dispatch = useDispatch();
  const selectedMetrics = useSelector(getSelectedMetrics);
  const allMetrics = useSelector(getAllMetrics);
  const metricsString = JSON.stringify(selectedMetrics);
  const [{ data }] = useSubscription({ query });
  const metricsCount =  allMetrics.length;
  
  const updateMeasurement = useCallback((measurements: Measurement[]) => {
    dispatch(actions.measurementRecevied(measurements));
  }, [dispatch]);

  useEffect(() => {
    if (!data || !data.newMeasurement) return;
    if (dataCache.length < metricsCount) {
      dataCache.push(data.newMeasurement);
    } else {
      updateMeasurement(dataCache);
      dataCache = [];
    }
  }, [data, metricsString, updateMeasurement , metricsCount]);

  return null;
}

export default Subscription;
