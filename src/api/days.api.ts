import { Dayjs } from "dayjs";
import { DayDetails } from "../types";
import { Preferences } from "@capacitor/preferences";

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

export function getDaysList(dates: Dayjs[]): DayDetails[] {
  const resolve = dates.map((day) => ({
    date: day,
    activities: Array.from({ length: Math.ceil(Math.random() * 5) }).map(
      (_, j) => ({
        title: tareas[Math.floor(Math.random() * tareas.length)],
        primary: j === 0,
        time: Math.floor(Math.random() * 30 + 30),
        completed: Math.random() > 0.5,
        timeUsed: Math.floor(Math.random() * 30 + 30),
      })
    ),
  }));

  resolve.forEach((r) => {
    Preferences.set({
      key: r.date.format("YYYY-DD-MM"),
      value: JSON.stringify(r),
    });
  });

  return resolve;
}

export async function getDayDetails(date: Dayjs) {
  const { value } = await Preferences.get({ key: date.format("YYYY-DD-MM") });

  if (value === null) return value;

  return JSON.parse(value) as DayDetails;
}
