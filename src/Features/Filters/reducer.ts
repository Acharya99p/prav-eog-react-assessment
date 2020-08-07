import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction, Filter } from '../../types';

interface IFiltersState {
  metrics: Filter[]
}

const initialState: IFiltersState = {
  metrics: []
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<string[]>) => {
      state.metrics = action.payload.map(title => ({ title, selected: false }));
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    metricSelected: (state, action: PayloadAction<string[]>) => {
      state.metrics = state.metrics.map(metric => ({
        ...metric,
        selected: action.payload.includes(metric.title)
      }))
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
