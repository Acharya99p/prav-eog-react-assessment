import { createSlice, PayloadAction } from 'redux-starter-kit';
import { produce } from 'immer';
import { timeSeries, TimeSeries } from 'pondjs';
import { Measurement, ApiErrorAction, Metric } from '../../types';

export interface IMeasurementState {
  [index: string]: any;
};

export interface IMeasurementResponse {
  metric: Metric,
  measurements: Measurement[]
};

const initialState: IMeasurementState = {};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    multipleMeasurementRecieved: (state, action: PayloadAction<IMeasurementResponse[]>) => {
      return produce(state, draftState => {
        // console.log('multipleMeasurementRecieved', metric, measurements);
        draftState = action.payload.reduce((items, item) => {
          const { metric, measurements } = item;
          const points = measurements.map(m => [m.at, m.value, m.unit]);
          const series = timeSeries({
            name: metric,
            columns: ["time", "value", "unit"],
            points
          });
          if (!items[metric]) {
            items[metric] = series;
          } else {
            items[metric] = TimeSeries.timeSeriesListMerge({
              name: metric,
              seriesList: [items[metric], series]
            });
          }
          return items;
        }, draftState);
        return draftState;
      });
    },
    measurementRecevied: (state, action: PayloadAction<Measurement>) => {
      const { metric, at, value, unit } = action.payload;
      return produce(state, draftState => {
        const series = timeSeries({
          name: metric,
          columns: ["time", "value", "unit"],
          points: [[at, value, unit]]
        });
        if (!draftState[metric]) {
          draftState[metric] = series;
        } else {
          draftState[metric] = TimeSeries.timeSeriesListMerge({
            name: metric,
            seriesList: [draftState[metric], series]
          });
        }
        return draftState;
      });
    },
    measurementErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
