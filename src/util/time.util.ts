import type { Dayjs } from "dayjs";
import { Activity } from "../types";
import dayjs from "dayjs";

export function getStartOfWeek(d: Dayjs) {
  return d.startOf("week");
}

export function getFormattedTimeForActivities(activities: Activity[]) {
  const totalTime = activities.reduce((acc, a) => acc + a.time, 0);

  return dayjs().startOf("day").add(totalTime, "minutes").format("HH[h] mm[m]");
}
