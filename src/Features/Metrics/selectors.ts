import { IState } from "../../store";
import { Filter } from "../../types";

export interface ILatestMeasurements {
  [index: string]: string | number;
};

export const getSelectedMetrics = (state: IState): Filter[] => state.filters.metrics.filter(m => m.selected);

export const getLatestMeasurements = (state: IState): ILatestMeasurements => {
  const { filters: { metrics }, measurements } = state;
  const result: ILatestMeasurements = {};
  metrics.forEach(m => {
    const measurement = measurements[m.title];
    if (measurement && measurement.size()) {
      result[m.title] = measurement.atLast().get("value");
    } else {
      result[m.title] = '';
    }
  });
  return result;
};