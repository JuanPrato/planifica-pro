import { create } from "zustand";
import { Activity, DayDetails } from "../types";
import type { Dayjs } from "dayjs";
import { addActivity, deleteActivity, getDaysList } from "../api/days.api";
import { formatToKey } from "../util/time.util";

interface DayState {
  days: DayDetails[];
  dates: Dayjs[];
  updateDaysData: (dates: Dayjs[]) => void;
  addActivity: (date: Dayjs, activity: Activity) => void;
  deleteActivity: (date: Dayjs, activity: Activity) => void;
  getDayData: (date: Dayjs) => DayDetails | null;
}

export const useDayStore = create<DayState>((set, get) => ({
  days: [],
  dates: [],
  updateDaysData: async (dates: Dayjs[]) => {
    const data = await getDaysList(dates);
    set(() => ({ days: data, dates }));
  },
  async addActivity(date, activity) {
    await addActivity(date, activity);
    get().updateDaysData(get().dates);
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
}));
