import dayjs, { Dayjs } from "dayjs";
import { Activity, DayDetails } from "../types";
import { Preferences } from "@capacitor/preferences";
import { formatToKey } from "../util/time.util";

const tareas = [
  "Responder correos pendientes",
  "Reunión con el equipo a las 10 AM",
  "Preparar la presentación del proyecto",
  "Revisar informes de ventas",
  "Actualizar el calendario de trabajo",
  "Llamar al cliente para seguimiento",
  "Organizar archivos en la computadora",
  "Comprar suministros de oficina",
  "Planificar la agenda de la próxima semana",
  "Realizar respaldo de datos importantes",
];

export async function getDaysList(dates: Dayjs[]): Promise<DayDetails[]> {
  const resolve = await Promise.all(
    dates.map(async (day) => {
      const saved = await getDayDetails(day);

      if (saved) return saved;

      return {
        date: day,
        activities: Array.from({ length: Math.ceil(Math.random() * 5) }).map(
          (_, j) => {
            const completed = Math.random() > 0.5;
            const time = Math.floor(Math.random() * 30 + 30);

            return {
              title: tareas[Math.floor(Math.random() * tareas.length)],
              primary: j === 0,
              time,
              completed,
              timeUsed: completed ? time : Math.floor(Math.random() * 30 + 30),
            };
          }
        ),
      };
    })
  );

  resolve.forEach((r) => {
    Preferences.set({
      key: formatToKey(r.date),
      value: JSON.stringify(r),
    });
  });

  return resolve;
}

export async function getDayDetails(date: Dayjs) {
  const { value } = await Preferences.get({ key: formatToKey(date) });

  if (value === null) return value;

  const data = JSON.parse(value);

  data.date = dayjs(data.date);

  return data as DayDetails;
}

function saveDay(day: DayDetails) {
  Preferences.set({
    key: formatToKey(day.date),
    value: JSON.stringify(day),
  });
}

export async function addActivity(date: Dayjs, activity: Activity) {
  const day = await getDayDetails(date);

  if (!day) return;

  day.activities.push(activity);

  saveDay(day);
}
