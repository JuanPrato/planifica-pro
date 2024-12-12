import { Dayjs } from "dayjs";
import { DayDetails } from "../types";

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
  return dates.map((day) => ({
    date: day,
    activities: Array.from({ length: Math.ceil(Math.random() * 5) }).map(
      (_, j) => ({
        title: tareas[Math.floor(Math.random() * tareas.length)],
        primary: j === 0,
        time: Math.random() * 30 + 30,
        completed: Math.random() > 0.5,
      })
    ),
  }));
}
