import { Dayjs } from "dayjs";

export type Activity = {
  title: string;
  time: number;
  primary: boolean;
  completed: boolean;
};

export type DayDetails = {
  activities: Activity[];
  date: Dayjs;
};
