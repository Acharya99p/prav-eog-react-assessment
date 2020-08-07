import { IState } from "../../store";

export const getAllMetrics = (state: IState) => state.filters.metrics;
export const getSelectedMetrics = (state: IState) => state.filters.metrics.filter(m => m.selected);
