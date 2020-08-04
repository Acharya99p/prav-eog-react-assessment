import { IState } from "../../store";

export const getFilters = (state: IState) => state.filters;
export const getMeasurements = (state: IState) => state.measurements;