import type { Dayjs } from "dayjs";
import { Activity } from "../types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const TIME_FORMAT = "YYYY-DD-MM";

export function getStartOfWeek(d: Dayjs) {
  return d.startOf("week");
}

export function getFormattedTimeForActivities(activities: Activity[]) {
  const totalTime = activities.reduce((acc, a) => acc + a.time, 0);

  return dayjs().startOf("day").add(totalTime, "minutes").format("HH[h] mm[m]");
}

export function formatTime(seconds: number) {
  return dayjs().startOf("day").add(seconds, "seconds").format("mm[:]ss");
}

export function fromKey(key: string) {
  return dayjs(key, TIME_FORMAT);
}

export function formatToKey(day: Dayjs) {
  return day.format(TIME_FORMAT);
}
