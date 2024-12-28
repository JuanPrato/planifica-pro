import { Dayjs } from "dayjs";

export type Activity = {
  id: number;
  title: string;
  time: number;
  maxTime: boolean;
  primary: boolean;
  completed: boolean;
  timeUsed?: number;
  date: Dayjs;
  notes?: Note[];
};

export type Note = {
  id: number;
  note: string;
};

export type DayDetails = {
  activities: Activity[];
  date: Dayjs;
};
