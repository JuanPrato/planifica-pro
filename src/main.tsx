import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import es from 'dayjs/locale/es';

dayjs.extend(updateLocale);

dayjs.locale(es);
dayjs.updateLocale('es', {
  weekdays: es.weekdays?.map(d => `${d[0]?.toUpperCase()}${d.slice(1)}`),
  weekdaysShort: es.weekdaysShort?.map(d => `${d[0]?.toUpperCase()}${d.slice(1)}`)
})

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);