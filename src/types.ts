import { Dayjs } from "dayjs";

export type Activity = {
  id: number;
  title: string;
  time: number;
  primary: boolean;
  completed: boolean;
  timeUsed?: number;
  date: Dayjs;
};

export type DayDetails = {
  activities: Activity[];
  date: Dayjs;
};
