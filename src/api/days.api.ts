import dayjs, { Dayjs } from "dayjs";
import { Activity, DayDetails, Note } from "../types";
import { Preferences } from "@capacitor/preferences";
import { formatToKey } from "../util/time.util";
import { API_ROUTES, GET } from "./api";

export async function getDaysList(
  dates: Dayjs[],
  token: string
): Promise<DayDetails[]> {
  const datesToFetch: string[] = [];

  const resolve = await Promise.all(
    dates.map(async (day, i) => {
      const saved = await getDayDetails(day);

      if (saved) return saved;

      datesToFetch.push(formatToKey(day));
    })
  );

  if (datesToFetch.length === 0) return resolve as DayDetails[];

  const days = await GET<DayDetails[]>(
    API_ROUTES.DAYS,
    token,
    { dates: datesToFetch.join(",") },
    (r) =>
      r.map((d) => ({
        date: dayjs(d.date),
        activities: d.activities.map((a) => ({ ...a, date: dayjs(a.date) })),
      }))
  );

  days.forEach((r) => {
    Preferences.set({
      key: formatToKey(r.date),
      value: JSON.stringify(r),
    });
  });

  const filterResult = resolve.filter(Boolean) as DayDetails[];
  filterResult.push(...days);

  return filterResult.toSorted((a, b) => (a.date.isBefore(b.date) ? -1 : 1));
}

export async function getDayDetails(date: Dayjs) {
  const { value } = await Preferences.get({ key: formatToKey(date) });

  if (value === null) return value;

  const data = JSON.parse(value) as DayDetails;

  data.date = dayjs(data.date);

  data.activities.forEach((a) => (a.date = dayjs(a.date)));

  return data;
}

function saveDay(day: DayDetails) {
  Preferences.set({
    key: formatToKey(day.date),
    value: JSON.stringify(day),
  });
}

export async function addActivity(activity: Activity): Promise<number> {
  let id = -1;

  const day = await getDayDetails(activity.date);

  if (!day) return id;

  const existingIndex = day.activities.findIndex(
    (act) => act.id === activity.id
  );

  if (existingIndex === -1) {
    id = Math.floor(Math.random() * 500);
    day.activities.push({ ...activity, id: id.toString() });
  } else {
    id = parseInt(day.activities[existingIndex].id);
    day.activities = day.activities.with(existingIndex, activity);
  }

  saveDay(day);

  return id;
}

export async function deleteActivity(date: Dayjs, activity: Activity) {
  const day = await getDayDetails(date);

  if (!day) return;

  day.activities = day.activities.filter((a) => a.id !== activity.id);

  saveDay(day);
}

export async function saveNote(activity: Activity, note: Note) {
  const day = await getDayDetails(activity.date);

  if (!day) return;

  if (!activity.notes) {
    activity.notes = [];
  }
  activity.notes.push(note);

  day.activities = day.activities.map((a) =>
    a.id === activity.id ? activity : a
  );

  saveDay(day);
}
