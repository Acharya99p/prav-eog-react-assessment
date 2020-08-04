import { IMeasurementState } from "../Subscription/reducer";

export const getUnits = (measurements: IMeasurementState) => {
  const units: any = {};
  Object.keys(measurements).forEach((m: any) => {
    const name = measurements[m].name();
    const unit = measurements[m].atFirst().get("unit");
    units[name] = unit;
  });
  return units;
}
