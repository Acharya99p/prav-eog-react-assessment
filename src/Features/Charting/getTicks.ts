export const getTicks = (start: number, end: number) => {
  const ticks = [];
  let date = new Date(+start);
  while (date.getTime() < end) {
    date.setMinutes(date.getMinutes() + 5);
    ticks.push(date.getTime());
  }
  return ticks;
}
