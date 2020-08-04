import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as filtersReducer } from '../Features/Filters/reducer';
import { reducer as measurementsReducer } from '../Features/Subscription/reducer';

export default {
  weather: weatherReducer,
  filters: filtersReducer,
  measurements: measurementsReducer
};
