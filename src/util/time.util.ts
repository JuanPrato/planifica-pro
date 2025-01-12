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
  const totalTime = activities.reduce((acc, a) => acc + (a.time ?? 0), 0);

  return dayjs().startOf("day").add(totalTime, "seconds").format("HH[h] mm[m]");
}

export function getFormattedRemainingTime(activity: Activity) {
  const remainingTime = activity.time - (activity.timeUsed || 0);

  if (remainingTime <= 0 || activity.completed) {
    return "Completado";
  }

  return dayjs()
    .startOf("day")
    .add(remainingTime, "seconds")
    .format("HH[h] mm[m]");
}

export function formatTime(seconds: number, format?: string) {
  return dayjs()
    .startOf("day")
    .add(seconds, "seconds")
    .format(format ?? "mm[:]ss");
}

export function fromKey(key: string) {
  return dayjs(key, TIME_FORMAT);
}

export function formatToKey(day: Dayjs) {
  return day.format(TIME_FORMAT);
}
