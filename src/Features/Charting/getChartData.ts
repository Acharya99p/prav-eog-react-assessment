import { Metric } from '../../types';
import { IMeasurementState } from '../Subscription/reducer';

export interface IChartData {
  name: string;
  [index: string]: any;
}


export const getChartData = (measurements: IMeasurementState, metrics: Metric[]): IChartData[] => {
  const dataMap: any = {};
  Object.keys(measurements)
    .forEach((metric: Metric) => {
      const json = measurements[metric].toJSON();
      json.points.forEach((point: number[]) => {
        if (metrics.includes(metric)) {
          const [time, value] = point;
          if (!dataMap[time]) {
            dataMap[time] = {};
          }
          dataMap[time][metric] = value;
        }
      })
    });
  return Object.keys(dataMap).map(d => ({
    name: d,
    ...dataMap[d]
  }));
}
