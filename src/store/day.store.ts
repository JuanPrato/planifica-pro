import { create } from "zustand";
import { Activity, DayDetails, Note } from "../types";
import type { Dayjs } from "dayjs";
import {
  addActivity,
  deleteActivity,
  getDaysList,
  saveNote,
} from "../api/days.api";
import { formatToKey } from "../util/time.util";

interface DayState {
  days: DayDetails[];
  dates: Dayjs[];
  updateDaysData: (dates: Dayjs[]) => Promise<void>;
  addActivity: (activity: Activity) => Promise<number>;
  deleteActivity: (date: Dayjs, activity: Activity) => void;
  getDayData: (date: Dayjs) => DayDetails | null;
  addNote: (activity: Activity, note: Note) => void;
}

export const useDayStore = create<DayState>((set, get) => ({
  days: [],
  dates: [],
  updateDaysData: async (dates: Dayjs[]) => {
    const data = await getDaysList(dates);
    set(() => ({ days: data, dates }));
  },
  async addActivity(activity) {
    const id = await addActivity(activity);
    await get().updateDaysData(get().dates);
    return id;
  },
  async deleteActivity(date: Dayjs, activity: Activity) {
    await deleteActivity(date, activity);
    get().updateDaysData(get().dates);
  },
  getDayData(date) {
    return (
      get().days.find((d) => formatToKey(d.date) === formatToKey(date)) ?? null
    );
  },
  async addNote(activity: Activity, note: Note) {
    await saveNote(activity, note);
    get().updateDaysData(get().dates);
  },
}));
