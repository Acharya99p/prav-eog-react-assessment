import { IState } from "../../store";

export const getSelectedMetrics = (state: IState) => state.filters.metrics.filter(m => m.selected);