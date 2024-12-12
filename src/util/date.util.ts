import type { Dayjs } from "dayjs";

export function getStartOfWeek(d: Dayjs) {
  return d.startOf("week");
}
